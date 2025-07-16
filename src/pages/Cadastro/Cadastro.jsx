import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { Eye, EyeOff } from 'lucide-react';
import './cadastro.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


function Cadastro() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Tentativa de cadastro');
  };

  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
                    <input type="text" id="nome" className="form-control" placeholder="Seu nome" required />
                    </div>
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
                            placeholder="Crie uma senha forte"
                            required
                        />
                        <span
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            style={{
                            position: 'absolute',
                            top: '45px',
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
                        <input type="radio" name="userType" value="paciente" defaultChecked/>
                        Paciente
                        </label>
                        <label className="radio-control">
                        <input type="radio" name="userType" value="profissional" />
                        Profissional
                        </label>
                    </div>
                    </div>
                    <button type="submit" className="login-submit-button">Criar Conta</button>
                </form>
                <div className="login-footer">
                    <p>Já tem uma conta?{" "} <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Faça Login</a></p>
                </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
    
  );
}

export default Cadastro;