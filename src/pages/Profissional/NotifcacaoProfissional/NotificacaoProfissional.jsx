import { useState } from "react";
import {
  CheckCircle2,
  MessageSquare,
  User,
  Bell,
  BellRing,
  CheckCheck,
  Inbox,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderProfissional from "../../../components/HeaderProfissional/HeaderProfissional";
import "./notificacaoProfissional.css";

function NotificacaoProfissional() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([
    {
      id: 0,
      tipo: "cadastro",
      lida: false,
      texto: "Complete seu perfil profissional para acessar todos os recursos.",
      tempo: "Agora",
      fixo: true,
    },
    {
      id: 1,
      tipo: "recado",
      lida: false,
      texto: "O paciente João enviou uma nova mensagem.",
      tempo: "Há 5 minutos",
    },
    {
      id: 2,
      tipo: "meta",
      lida: false,
      texto: 'Lucas concluiu a meta do dia.',
      tempo: "Há 1 hora",
    },
    {
      id: 3,
      tipo: "meta",
      lida: true,
      texto: 'Nova meta adicionada para João: "Fazer 30min de caminhada".',
      tempo: "Ontem",
    },
    {
      id: 4,
      tipo: "recado",
      lida: true,
      texto: "Você visualizou a anotação do paciente Ana.",
      tempo: "Ontem",
    },
  ]);

  const [filtro, setFiltro] = useState("todas");

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const handleNotificacaoClick = (notificacao) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === notificacao.id ? { ...n, lida: true } : n))
    );

    if (notificacao.tipo === "cadastro") {
      navigate("/editarPerfilProfissional");
    }
  };

  const naoLidas = notificacoes.filter((n) => !n.lida).length;
  const porTipo = (tipo) => notificacoes.filter((n) => n.tipo === tipo).length;

  const filtradas =
    filtro === "todas"
      ? notificacoes
      : notificacoes.filter(
          (n) => (filtro === "naoLidas" ? !n.lida : n.tipo === filtro)
        );

  const filtraInfo = {
    todas: { label: "Todas", icon: Inbox },
    naoLidas: { label: "Não lidas", icon: BellRing },
    recado: { label: "Recados", icon: MessageSquare },
    meta: { label: "Metas", icon: CheckCircle2 },
  };

  return (
    <>
      <HeaderProfissional>
        <div className="nof-page">
          <div className="nof-head">
            <div className="nof-head-title">
              <span className="nof-head-icon">
                <Bell size={22} />
              </span>
              <div>
                <h1>Notificações</h1>
                <p>Fique por dentro de tudo que acontece</p>
              </div>
            </div>
            {naoLidas > 0 && (
              <button className="nof-mark-all" onClick={marcarTodasComoLidas}>
                <CheckCheck size={17} />
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="nof-stats">
            <div className="nof-stat nof-stat-total">
              <span className="nof-stat-icon">
                <Inbox size={20} />
              </span>
              <div className="nof-stat-info">
                <strong>{notificacoes.length}</strong>
                <span>Totais</span>
              </div>
            </div>
            <div className="nof-stat nof-stat-unread">
              <span className="nof-stat-icon">
                <BellRing size={20} />
              </span>
              <div className="nof-stat-info">
                <strong>{naoLidas}</strong>
                <span>Não lidas</span>
              </div>
            </div>
            <div className="nof-stat nof-stat-recado">
              <span className="nof-stat-icon">
                <MessageSquare size={20} />
              </span>
              <div className="nof-stat-info">
                <strong>{porTipo("recado")}</strong>
                <span>Recados</span>
              </div>
            </div>
            <div className="nof-stat nof-stat-meta">
              <span className="nof-stat-icon">
                <CheckCircle2 size={20} />
              </span>
              <div className="nof-stat-info">
                <strong>{porTipo("meta")}</strong>
                <span>Metas</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="nof-filters">
            <div className="nof-filters-label">
              <Filter size={15} />
              <span>Filtrar</span>
            </div>
            <div className="nof-filter-btns">
              {Object.entries(filtraInfo).map(([key, { label, icon: Icon }]) => (
                <button
                  key={key}
                  className={`nof-filter-btn ${filtro === key ? "active" : ""}`}
                  onClick={() => setFiltro(key)}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div className="nof-card">
            <div className="nof-list">
              {filtradas.length === 0 ? (
                <div className="nof-empty">
                  <Inbox size={40} />
                  <p>Nenhuma notificação por aqui.</p>
                  <span>Você está em dia! 🎉</span>
                </div>
              ) : (
                filtradas.map((n) => (
                  <div
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleNotificacaoClick(n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleNotificacaoClick(n);
                    }}
                    className={`nof-item ${n.lida ? "read" : "unread"} ${
                      n.fixo ? "fixo" : ""
                    }`}
                  >
                    <div className={`nof-icon nof-icon-${n.tipo}`}>
                      {n.tipo === "meta" && <CheckCircle2 size={20} />}
                      {n.tipo === "recado" && <MessageSquare size={20} />}
                      {n.tipo === "cadastro" && <User size={20} />}
                    </div>
                    <div className="nof-item-content">
                      <p>{n.texto}</p>
                      <span>{n.tempo}</span>
                    </div>
                    {!n.lida && <span className="nof-dot" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </HeaderProfissional>
    </>
  );
}

export default NotificacaoProfissional;
