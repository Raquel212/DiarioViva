import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const usuarios = [
    {
      email: "paciente@email.com",
      senha: "123456",
      tipoUsuario: "PACIENTE",
      perfilCompleto: true,
    },
    {
      email: "profissional@email.com",
      senha: "123456",
      tipoUsuario: "PROFISSIONAL",
      perfilCompleto: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setCarregando(true);
    setMensagemErro("");

    setTimeout(() => {
      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        localStorage.setItem("tipoUsuario", usuario.tipoUsuario);

        // Redireciona direto para a home do tipo de usuário
        if (usuario.tipoUsuario === "PACIENTE") {
          navigate("/homePaciente");
        } else if (usuario.tipoUsuario === "PROFISSIONAL") {
          navigate("/homeProfissional");
        }
      } else {
        setMensagemErro("Email ou senha inválidos. Tente novamente.");
      }

      setCarregando(false);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="login-page">
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
                    top: "41px",
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
