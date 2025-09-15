import { useState } from "react";
import { CheckCircle2, MessageSquare, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderPaciente from "../../../components/HeaderPaciente/HeaderPaciente";
import Footer from "../../../components/Footer/Footer";
import "./notificacaoPaciente.css";

function NotificacaoPaciente() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([
    {
      id: 0,
      tipo: "cadastro",
      lida: false,
      texto: "Complete seu cadastro para acessar todos os recursos.",
      tempo: "Agora",
      fixo: true,
    },
    {
      id: 1,
      tipo: "recado",
      lida: false,
      texto: "Dr. Carlos enviou um novo recado.",
      tempo: "Há 5 minutos",
    },
    {
      id: 2,
      tipo: "meta",
      lida: false,
      texto: 'Você completou a meta "Caminhar por 20 minutos".',
      tempo: "Há 1 hora",
    },
    {
      id: 3,
      tipo: "meta",
      lida: true,
      texto: 'Nova meta adicionada: "Beber chá antes de dormir".',
      tempo: "Ontem",
    },
    {
      id: 4,
      tipo: "recado",
      lida: true,
      texto: "Dr. Carlos visualizou sua anotação no diário.",
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
      navigate("/editarPerfilPaciente");
    }
  };

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <>
      <HeaderPaciente />

      <div className="profile-page-container">
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="section-header">
              <Bell />
              <h2>Notificações</h2>
              {naoLidas > 0 && <span className="badge">{naoLidas}</span>}
            </div>
            <button onClick={marcarTodasComoLidas} className="mark-all-read-btn">
              Marcar todas como lidas
            </button>
          </div>

          <div className="profile-card-body">
            <div className="notificacoes-list">
              {notificacoes.map((n) => (
                <div
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleNotificacaoClick(n)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleNotificacaoClick(n);
                  }}
                  className={`notificacao-item ${n.lida ? "read" : "unread"} ${
                    n.fixo ? "fixo" : ""
                  }`}
                >
                  <div className={`notificacao-icon ${n.tipo}`}>
                    {n.tipo === "meta" && <CheckCircle2 size={20} />}
                    {n.tipo === "recado" && <MessageSquare size={20} />}
                    {n.tipo === "cadastro" && <User size={20} />}
                  </div>
                  <div className="notificacao-content">
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

export default NotificacaoPaciente;
