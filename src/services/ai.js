// ============================================================
// Serviço de IA do DiárioViva
// Suporta qualquer API compatível com a OpenAI (OpenAI, OpenRouter, etc.)
// A chave pode vir de:
//   1. Configuração salva pelo usuário (localStorage) — via assistente
//   2. Variáveis de ambiente do Vite: VITE_AI_API_KEY, VITE_AI_BASE_URL, VITE_AI_MODEL
// ============================================================

const DEFAULT_BASE_URL = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4o-mini";
const STORAGE_KEY = "diarioViva_aiConfig";

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

/** Retorna a configuração atual (localStorage tem prioridade sobre .env). */
export function getAIConfig() {
  const stored = readStoredConfig();
  return {
    apiKey: stored.apiKey || safeEnvVar("VITE_AI_API_KEY") || "",
    baseUrl:
      (stored.baseUrl || safeEnvVar("VITE_AI_BASE_URL") || DEFAULT_BASE_URL).replace(/\/+$/, ""),
    model: stored.model || safeEnvVar("VITE_AI_MODEL") || DEFAULT_MODEL,
  };
}

/** Salva a configuração fornecida no localStorage do navegador. */
export function saveAIConfig(config) {
  const current = getAIConfig();
  const next = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

/** Indica se já existe uma chave de API configurada. */
export function isAIConfigured() {
  return Boolean(getAIConfig().apiKey);
}

/** Limpa a configuração salva no navegador. */
export function clearAIConfig() {
  localStorage.removeItem(STORAGE_KEY);
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

  if (!config.apiKey) {
    throw new Error("AI_NOT_CONFIGURED");
  }

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

  let res;
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
