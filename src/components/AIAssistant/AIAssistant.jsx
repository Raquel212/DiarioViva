import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Settings,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import "./aiAssistant.css";
import {
  chatCompletion,
  clearAIConfig,
  getAIErrorMessage,
  getAIConfig,
  isAIConfigured,
  saveAIConfig,
} from "../../services/ai";

const ROLE_CONFIG = {
  paciente: {
    label: "Assistente do Paciente",
    placeholder: "Pergunte sobre metas, motivação ou bem-estar...",
    system: `Você é o "Assistente DiárioViva", um assistente amigável e acolhedor do aplicativo de saúde DiárioViva.
Você conversa com um PACIENTE que está em acompanhamento com um(a) profissional de saúde.
Ajude-o(a) com: motivação e hábitos diários; explicações simples sobre metas do tratamento; dicas gerais de bem-estar; apoio emocional gentil.
Seja sempre empático, direto e em português do Brasil.
Importante: você NÃO é um profissional de saúde. Sempre recomende que dúvidas clínicas graves sejam levadas ao profissional responsável.`,
    suggestions: [
      "Como me manter motivado(a) com as metas do dia?",
      "Dê uma ideia de reflexão para o meu diário de hoje",
      "O que fazer quando eu não consigo cumprir uma meta?",
      "Dicas simples para dormir melhor",
    ],
    accent: "#14b8a6",
  },
  profissional: {
    label: "Assistente do Profissional",
    placeholder: "Peça ajuda para recados, metas ou resumos...",
    system: `Você é o "Assistente DiárioViva", um assistente do aplicativo de saúde DiárioViva.
Você conversa com um PROFISSIONAL DE SAÚDE (médico, nutricionista, psicólogo, fisioterapeuta etc.).
Ajude a: redigir recados de apoio claros e empáticos para pacientes; sugerir metas diárias realistas; identificar pontos de atenção em resumos de diários; organizar relatórios.
Responda em português do Brasil, de forma objetiva e profissional, respeitando o cuidado com a saúde do paciente.
Evite diagnosticar; reforce que decisões clínicas são sempre do profissional.`,
    suggestions: [
      "Sugira um recado de apoio para um paciente desanimado",
      "Sugira metas diárias realistas de hidratação e caminhada",
      "Ajude-me a resumir o diário de um paciente",
      "Como orientar um paciente que parou de registrar no diário?",
    ],
    accent: "#0d9488",
  },
};

function AISettings({ open, onClose }) {
  const config = getAIConfig();
  const [form, setForm] = useState({
    apiKey: config.apiKey,
    baseUrl: config.baseUrl,
    model: config.model,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      const c = getAIConfig();
      setForm({ apiKey: c.apiKey, baseUrl: c.baseUrl, model: c.model });
      setSaved(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveAIConfig({
      apiKey: form.apiKey.trim(),
      baseUrl: form.baseUrl.trim() || "https://api.openai.com/v1",
      model: form.model.trim() || "gpt-4o-mini",
    });
    setSaved(true);
  };

  const handleClear = () => {
    clearAIConfig();
    setForm({ ...form, apiKey: "" });
    setSaved(true);
  };

  const configured = isAIConfigured();

  return (
    <div className="ai-settings-overlay" onClick={onClose}>
      <div className="ai-settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ai-settings-header">
          <h3>Configurar IA</h3>
          <button className="ai-icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div
          className={`ai-config-status ${configured ? "ok" : "missing"}`}
        >
          {configured
            ? "✓ IA configurada — pronta para usar."
            : "Sem chave de API — o assistente ainda não consegue responder."}
        </div>

        <form onSubmit={handleSave} className="ai-settings-form">
          <label>
            Chave da API
            <input
              type="password"
              value={form.apiKey}
              onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
              placeholder="sk-..."
              autoComplete="off"
            />
          </label>
          <label>
            URL base
            <input
              type="text"
              value={form.baseUrl}
              onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
              placeholder="https://api.openai.com/v1"
            />
          </label>
          <label>
            Modelo
            <input
              type="text"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              placeholder="gpt-4o-mini"
            />
          </label>

          {saved && <p className="ai-save-note">✓ Configuração salva no navegador.</p>}
          <p className="ai-otica-note">
            Também é possível definir as variáveis <code>VITE_AI_API_KEY</code>,{" "}
            <code>VITE_AI_BASE_URL</code> e <code>VITE_AI_MODEL</code> no arquivo <code>.env</code>.
          </p>

          <div className="ai-settings-actions">
            <button type="button" className="ai-btn-ghost" onClick={handleClear}>
              Limpar chave
            </button>
            <button type="submit" className="ai-btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AIAssistant({ role = "paciente" }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.paciente;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const addMessage = (roleName, content) =>
    setMessages((prev) => [...prev, { role: roleName, content }]);

  const send = async (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text || loading) return;

    setError("");
    setInput("");

    if (!isAIConfigured()) {
      setError("Ainda não há uma chave de IA configurada.");
      setOpen(true);
      setShowSettings(true);
      return;
    }

    addMessage("user", text);
    setLoading(true);

    try {
      const history = [...messages, { role: "user", content: text }];
      const reply = await chatCompletion({
        system: cfg.system,
        messages: history,
      });
      addMessage("assistant", reply);
    } catch (err) {
      addMessage(
        "assistant",
        `⚠️ ${getAIErrorMessage(err.message || "AI_SERVER")}`
      );
    } finally {
      setLoading(false);
    }
  };

  const quickSuggestion = (s) => send(s);

  return (
    <>
      <div className={`ai-assistant ${open ? "open" : ""}`}>
        <button
          className="ai-fab"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar assistente" : "Abrir assistente de IA"}
        >
          {open ? <X size={22} /> : <Sparkles size={22} />}
        </button>

        {open && (
          <div className="ai-panel">
            <div className="ai-panel-header" style={{ "--accent": cfg.accent }}>
              <span className="ai-panel-icon">
                <Bot size={20} />
              </span>
              <div className="ai-panel-titles">
                <strong>{cfg.label}</strong>
                <span className="ai-panel-status">
                  <i className="ai-dot" /> IA on-line
                </span>
              </div>
              <button
                className="ai-icon-btn"
                onClick={() => setShowSettings(true)}
                aria-label="Configurar IA"
                title="Configurar IA"
              >
                <Settings size={19} />
              </button>
            </div>

            <div className="ai-messages" ref={listRef}>
              {messages.length === 0 && (
                <div className="ai-welcome">
                  <p>
                    Olá! 👋 Sou o assistente de IA do DiárioViva. Posso ajudar
                    você com dicas, reflexões e organização. O que deseja?
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ${m.role}`}>
                  <div className="ai-bubble">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="ai-msg assistant">
                  <div className="ai-bubble ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {messages.length > 0 && (
              <div className="ai-suggestions">
                {cfg.suggestions.map((s) => (
                  <button key={s} onClick={() => quickSuggestion(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {error && <div className="ai-error">{error}</div>}
            {!isAIConfigured() && (
              <div className="ai-config-hint">
                ⚙️ Configure uma chave de IA para conversar.
                <button onClick={() => setShowSettings(true)}>Configurar</button>
              </div>
            )}

            <form
              className="ai-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={cfg.placeholder}
                disabled={loading}
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={loading || !input.trim()}
                aria-label="Enviar"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="ai-disclaimer">
              A IA dá apoio geral e não substitui a orientação de um
              profissional de saúde.
              <button
                className="ai-clear"
                onClick={() => setMessages([])}
                title="Limpar conversa"
                aria-label="Limpar conversa"
              >
                <Trash2 size={14} /> limpar conversa
              </button>
            </div>
          </div>
        )}
      </div>

      <AISettings open={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}
