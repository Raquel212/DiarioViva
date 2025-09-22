import { useState } from "react";
import { CheckCircle2, MessageSquare, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderProfissional from "../../../components/HeaderProfissional/HeaderProfissional";
import Footer from "../../../components/Footer/Footer";
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
      texto: 'Lucas concluio a meta do dia".',
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

  return (
    <>
      <HeaderProfissional />

      <div className="profile-page-container-profissional">
        <div className="profile-card-profissional">
          <div className="profile-card-header-profissional">
            <div className="section-header-profissional">
              <Bell />
              <h2>Notificações</h2>
              {naoLidas > 0 && <span className="badge-profissional">{naoLidas}</span>}
            </div>
            <button
              onClick={marcarTodasComoLidas}
              className="mark-all-read-btn-profissional"
            >
              Marcar todas como lidas
            </button>
          </div>

          <div className="profile-card-body-profissional">
            <div className="notificacoes-list-profissional">
              {notificacoes.map((n) => (
                <div
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleNotificacaoClick(n)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleNotificacaoClick(n);
                  }}
                  className={`notificacao-item-profissional ${n.lida ? "read" : "unread"} ${
                    n.fixo ? "fixo" : ""
                  }`}
                >
                  <div className={`notificacao-icon-profissional ${n.tipo}`}>
                    {n.tipo === "meta" && <CheckCircle2 size={20} />}
                    {n.tipo === "recado" && <MessageSquare size={20} />}
                    {n.tipo === "cadastro" && <User size={20} />}
                  </div>
                  <div className="notificacao-content-profissional">
                    <p>{n.texto}</p>
                    <span>{n.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NotificacaoProfissional;
