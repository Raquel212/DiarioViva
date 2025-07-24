import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setMensagemErro("");

    try {
      const resposta = await api.post("api/login", {
        email,
        senha,
      });

      const { token, tipoUsuario, perfilCompleto } = resposta.data;

      localStorage.setItem("token", token);
      localStorage.setItem("tipoUsuario", tipoUsuario);

      if (tipoUsuario === "PACIENTE") {
        if (perfilCompleto) {
          navigate("/homePaciente");
        } else {
          navigate("/editarPerfilPaciente");
        }
      } else if (tipoUsuario === "PROFISSIONAL") {
        if (perfilCompleto) {
          navigate("/homeProfissional");
        } else {
          navigate("/editarPerfilProfissional");
        }
      } else {
        setMensagemErro("Tipo de usuário não reconhecido.");
      }
    } catch (erro) {
      if (erro.response?.data?.message) {
        setMensagemErro(erro.response.data.message);
      } else if (erro.response?.status === 403) {
        setMensagemErro("Email ou senha inválidos. Tente novamente.");
      } else {
        setMensagemErro(
          "Erro ao conectar. Verifique seus dados e tente novamente."
        );
      }
      console.error("Erro no login:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        {/* O resto do seu código JSX continua o mesmo... */}
        <div className="login-branding">
          <div>
            <div className="branding-logo"></div>
            <img
              src="https://placehold.co/800x800/ffffff/0d9488?text=Live\nDiary"
              alt="Ilustração de bem-estar"
              className="branding-image"
            />
            <div className="branding-text">
              <h2>Transforme seus objetivos em hábitos.</h2>
              <p>
                Sua jornada de saúde conectada e apoiada pelo seu profissional.
              </p>
            </div>
          </div>
        </div>
        <div className="login-form-wrapper">
          <div className="login-container">
            <div className="login-header">
              <h1 className="login-title">Bem-vindo(a) de volta!</h1>
              <p className="login-subtitle">
                Insira seus dados para acessar a plataforma.
              </p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <label htmlFor="senha">Senha</label>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  className="form-control"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <span
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "10px",
                    cursor: "pointer",
                    color: "#555",
                    zIndex: 1,
                  }}
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="form-options">
                <div className="checkbox-group">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Lembrar-me</label>
                </div>
                <a href="#">Esqueceu a senha?</a>
              </div>
              {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
              <button
                type="submit"
                className="login-submit-button"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
            <div className="login-footer">
              <p>
                Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;