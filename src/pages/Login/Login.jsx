import './Login.css';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de autenticação
    console.log('Tentativa de login');
  };

  return (
    <div className="login-page">
      <div className="login-branding">
        <div>
          <div className="branding-logo">
          </div>
          <img 
            src="https://placehold.co/800x800/ffffff/0d9488?text=Live\nDiary" 
            alt="Ilustração de bem-estar" 
            className="branding-image"
          />
          <div className="branding-text">
            <h2>Transforme seus objetivos em hábitos.</h2>
            <p>Sua jornada de saúde conectada e apoiada pelo seu profissional.</p>
          </div>
        </div>
      </div>
      <div className="login-form-wrapper">
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">Bem-vindo(a) de volta!</h1>
            <p className="login-subtitle">Insira seus dados para acessar a plataforma.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" className="form-control" placeholder="seu@email.com" required />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
                  <label htmlFor="senha">Senha</label>
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    id="senha"
                    className="form-control"
                    placeholder="••••••••"
                    required
                  />
                  <span
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    style={{
                      position: 'absolute',
                      top: '45px',
                      right: '10px',
                      cursor: 'pointer',
                      color: '#555',
                      zIndex: 1
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
            <button type="submit" className="login-submit-button">Entrar</button>
          </form>
          <div className="login-footer">
            <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;