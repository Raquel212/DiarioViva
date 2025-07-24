import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { Eye, EyeOff } from 'lucide-react';
import './cadastro.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api'; 

function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("PACIENTE");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setCarregando(true);
    setMensagemSucesso("");
    setMensagemErro("");

    const dadosDoUsuario = {
      nome,
      email,
      senha,
      tipoUsuario,
    };

    try {
      const resposta = await api.post("/api/usuario", dadosDoUsuario); // ajuste a URL conforme a rota da sua API
      console.log("Usuário cadastrado:", resposta.data);
      setMensagemSucesso("Cadastro realizado com sucesso! Você já pode fazer o login.");
      setNome("");
      setEmail("");
      setSenha("");
      setTipoUsuario("PACIENTE");
    } catch (erro) {
      if (erro.response && erro.response.data?.message) {
        setMensagemErro(erro.response.data.message);
      } else if (
        erro.response?.data &&
        typeof erro.response.data === "string" &&
        erro.response.data.includes("Email já cadastrado")
      ) {
        setMensagemErro("Este email já está cadastrado no sistema.");
      } else {
        setMensagemErro("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      }
      console.error("Erro no cadastro:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-page cadastro-page">
        <div className="login-branding cadastro-branding">
          <div>
            <img 
              src="https://placehold.co/800x800/ffffff/0d9488?text=Join\nUs" 
              alt="Ilustração de cadastro" 
              className="branding-image"
            />
            <div className="branding-text">
              <h2>Comece uma nova jornada.</h2>
              <p>Junte-se a uma comunidade focada em saúde e bem-estar. O primeiro passo é o mais importante.</p>
            </div>
          </div>
        </div>
        <div className="login-form-wrapper cadastro-form-wrapper">
          <div className="login-container">
            <div className="login-header">
              <h1 className="login-title">Crie sua conta</h1>
              <p className="login-subtitle">É rápido e fácil. Vamos começar!</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  className="form-control" 
                  placeholder="Seu nome" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required 
                />
              </div>
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
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="senha">Senha</label>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  id="senha"
                  className="form-control"
                  placeholder="Crie uma senha forte"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <span
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: 'absolute',
                    top: '41px',
                    right: '10px',
                    cursor: 'pointer',
                    color: '#555'
                  }}
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="form-group">
                <label>Qual o seu perfil?</label>
                <div className="radio-group">
                  <label className="radio-control">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="PACIENTE" 
                      checked={tipoUsuario === "PACIENTE"}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                    />
                    Paciente
                  </label>
                  <label className="radio-control">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="PROFISSIONAL"
                      checked={tipoUsuario === "PROFISSIONAL"}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                    />
                    Profissional
                  </label>
                </div>
              </div>

              {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
              {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
              
              <button type="submit" className="login-submit-button" disabled={carregando}>
                {carregando ? "Cadastrando..." : "Criar Conta"}
              </button>
            </form>
            <div className="login-footer">
              <p>Já tem uma conta? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Faça Login</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cadastro;
