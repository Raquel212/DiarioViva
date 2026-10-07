const DEFAULT_BASE_URL = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4o-mini";
const STORAGE_KEY = "diarioViva_aiConfig";

function demoModeEnabled() {
  try {
    return (
      import.meta.env?.VITE_AI_DEMO === "true" ||
      import.meta.env?.VITE_AI_DEMO === "1"
    );
  } catch {
    return false;
  }
}

function processOrDemo() {
  return demoModeEnabled() || !getAIConfig().apiKey;
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/** Gera uma resposta simulada de demonstração de acordo com a pergunta. */
function demoReply(system, messages) {
  const last =
    (messages || [])
      .filter((m) => m?.content)
      .slice(-1)[0]?.content || "";

  const q = last.toLowerCase();
  const isProfissional = (system || "").toLowerCase().includes("profissional");

  if (isProfissional) {
    if (q.includes("recado")) {
      return "Claro! Aqui vai uma sugestão de recado para enviar ao paciente:\n\n\"Olá! 👋 Que bom ter você por aqui. Lembre-se de que cada pequena conquista conta — continue no seu ritmo, um passo de cada vez. Estou aqui para te apoiar no que precisar!\"\n\nSe quiser, posso adaptar o tom para algo mais formal ou motivacional.";
    }
    if (q.includes("meta") || q.includes("meta")) {
      return "Boas metas diárias realistas para sugerir:\n\n• Beber pelo menos 1,5L de água ao longo do dia\n• Fazer 20 minutos de caminhada leve\n• Registrar pelo menos uma refeição no diário\n\nEssas metas são simples e fáceis de manter, o que reforça a adesão do paciente ao tratamento.";
    }
    if (q.includes("diário") || q.includes("diario") || q.includes("resum")) {
      return "Sugestão de resumo do diário do paciente:\n\nO paciente relatou boa adesão à hidratação e mostrou motivação para manter a caminhada diária. Apontou cansaço no fim do dia, mas sem sinais de alerta. Recomendo reforçar o elogio e manter as metas atuais por mais uma semana, revisando em seguida.";
    }
    return "Olá! Estou aqui para ajudar você no acompanhamento dos seus pacientes. 🤝\n\nPosso apoiá-lo(a) com:\n• Redigir recados de apoio empáticos\n• Sugerir metas diárias realistas\n• Resumir diários e identificar pontos de atenção\n\n(Esta é uma resposta de demonstração — para usar a IA de verdade, adicione sua chave de API no arquivo .env ou na engrenagem do assistente.)";
  }

  // Paciente
  if (q.includes("motiv")) {
    return "Que ótima pergunta! 🚀 A motivação muitas vezes vem de começar pequeno. Que tal focar em apenas uma meta hoje — tipo dar uma caminhada de 10 minutos? Celebrar cada vitória, por menor que seja, reforça o hábito.\n\nDica: anote como você se sentiu depois. Vai te ajudar a perceber seu progresso!";
  }
  if (q.includes("reflex") || q.includes("diário") || q.includes("diario")) {
    return "Aqui vai uma ideia de reflexão para o seu diário de hoje:\n\n\"O que me trouxe mais bem-estar hoje? E o que eu aprecio em mim nesse momento?\"\n\nEscreva com calma, sem julgar. Esse momento é seu. 📖";
  }
  if (q.includes("meta") || q.includes("consegu") || q.includes("cumpr")) {
    return "É totalmente normal ter dias em que não conseguimos cumprir tudo. 🌱\n\nO importante é não se cobrar demais. Reajuste a meta para algo menor, só para hoje, e reflita sobre o que atrapalhou. Falar com seu profissional sobre isso também pode ajudar a adaptar o plano.";
  }
  if (q.includes("dorm") || q.includes("sono")) {
    return "Dicas simples para dormir melhor: 😴\n\n• Mantenha um horário regular para dormir e acordar\n• Evite telas 1h antes de deitar\n• Reduza cafeína à tarde/noite\n• Crie um ritual relaxante (leitura, respiração)\n\nPequenos ajustes fazem grande diferença no seu descanso!";
  }
  return "Olá! 😊 Sou o assistente do DiárioViva e estou aqui para te ajudar com suas metas, diário e bem-estar.\n\nMe pergunte sobre motivação, reflexões para o diário, dicas de sono ou como lidar com metas difíceis.\n\n(Esta é uma resposta de demonstração — adicione sua chave de API no arquivo .env ou na engrenagem do assistente para conversar com a IA de verdade.)";
}

function readStoredConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function safeEnvVar(name) {
  try {
    return import.meta.env?.[name] ?? "";
  } catch {
    return "";
  }
}


export function getAIConfig() {
  const stored = readStoredConfig();
  return {
    apiKey: stored.apiKey || safeEnvVar("VITE_AI_API_KEY") || "",
    baseUrl:
      (stored.baseUrl || safeEnvVar("VITE_AI_BASE_URL") || DEFAULT_BASE_URL).replace(/\/+$/, ""),
    model: stored.model || safeEnvVar("VITE_AI_MODEL") || DEFAULT_MODEL,
  };
}


export function saveAIConfig(config) {
  const current = getAIConfig();
  const next = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}


export function isAIConfigured() {
  if (processOrDemo()) return true;
  return Boolean(getAIConfig().apiKey);
}


export function isAIDemo() {
  return processOrDemo();
}


export function clearAIConfig() {
  localStorage.removeItem(STORAGE_KEY);
}


function isGemini(baseUrl) {
  return (baseUrl || "").includes("generativelanguage.googleapis.com");
}

function buildGeminiPrompt(system, messages, hasUserMessage) {
  const parts = [];
  if (system) parts.push(`${system}\n\n`);
  (messages || [])
    .filter((m) => m && m.content && typeof m.content === "string" && m.content.trim())
    .forEach((m) => {
      const role = m.role === "assistant" ? "Assistente" : "Usuário";
      parts.push(`${role}: ${m.content}\n\n`);
    });
  if (!hasUserMessage) parts.push("Usuário: Olá!\n\n");
  return parts.join("").trim();
}

/**
 * Envia uma conversa para o modelo e retorna a resposta (texto).
 *
 * @param {object}  options
 * @param {string}  options.system  - Prompt de sistema (personalidade/contexto).
 * @param {Array}   options.messages - Histórico [{ role, content }, ...].
 * @param {number}  [options.temperature=0.7]
 * @param {number}  [options.maxTokens=900]
 * @returns {Promise<string>}
 */
export async function chatCompletion({ system = "", messages, temperature = 0.7, maxTokens = 900 } = {}) {
  const config = getAIConfig();

  const hasUserMessage = (messages || []).some(
    (m) => m.role === "user" && m.content
  );

  // Resposta simulada para demonstração (sem API externa)
  if (processOrDemo()) {
    await delay(650); // simula latência
    return demoReply(system, messages);
  }

  if (!config.apiKey) {
    throw new Error("AI_NOT_CONFIGURED");
  }

  let res;

  // ----- API do Google Gemini (formato nativo) -----
  if (isGemini(config.baseUrl)) {
    const prompt = buildGeminiPrompt(system, messages, hasUserMessage);
    const url = `${config.baseUrl.replace(/\/+$/, "")}/models/${config.model}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          },
        }),
      });
    } catch {
      throw new Error("NETWORK");
    }

    if (!res.ok) {
      if (res.status === 400 || res.status === 403) throw new Error("AI_AUTH");
      if (res.status === 429) throw new Error("AI_RATE_LIMIT");
      throw new Error("AI_SERVER");
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error("AI_EMPTY");
    return text;
  }

  // ----- APIs compatíveis com OpenAI (padrão) -----
  const body = {
    model: config.model,
    temperature,
    max_tokens: maxTokens,
    messages: [],
  };

  if (system) {
    body.messages.push({ role: "system", content: system });
  }

  // Filtra mensagens vazias para não poluir a API
  (messages || [])
    .filter((m) => m && m.content && typeof m.content === "string" && m.content.trim())
    .forEach((m) =>
      body.messages.push({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })
    );

  if (body.messages.length === 0) {
    body.messages.push({ role: "user", content: "Olá!" });
  }

  try {
    res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
        ...(config.baseUrl.includes("openrouter") ? { "HTTP-Referer": window.location.origin } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("NETWORK");
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) throw new Error("AI_AUTH");
    if (res.status === 429) throw new Error("AI_RATE_LIMIT");
    throw new Error("AI_SERVER");
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("AI_EMPTY");
  return text;
}

/** Mensagens de erro amigáveis em português. */
export function getAIErrorMessage(code) {
  const map = {
    AI_NOT_CONFIGURED:
      "Nenhuma chave de API configurada. Clique na engrenagem e informe sua chave (ou preencha o arquivo .env).",
    AI_AUTH: "Falha de autenticação: verifique se a chave de API está correta.",
    AI_RATE_LIMIT: "Limite de requisições atingido. Tente novamente em alguns instantes.",
    AI_SERVER: "O servidor de IA retornou um erro. Tente novamente.",
    AI_EMPTY: "A IA não retornou conteúdo. Tente reformular a pergunta.",
    NETWORK: "Sem conexão com o servidor de IA. Verifique sua internet.",
  };
  return map[code] || "Não foi possível obter resposta da IA. Tente novamente.";
}
