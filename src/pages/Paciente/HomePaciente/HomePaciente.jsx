import { useState } from 'react';
import { Home, CheckSquare, BookOpen, MessageSquare, Smile, Meh, Frown, ThumbsUp } from 'lucide-react';
import HeaderPaciente from '../../../components/HeaderPaciente/HeaderPaciente';
import Footer from '../../../components/Footer/Footer';
import './homePaciente.css';

function HomePaciente() {
  const nomePaciente = "Maria";
//   const metasConcluidas = 1;
  
  const [metas, setMetas] = useState([
    { id: 1, texto: 'Comer uma fruta no café da manhã', concluida: true },
    { id: 2, texto: 'Caminhar por 20 minutos', concluida: false },
    { id: 3, texto: 'Beber 2 litros de água', concluida: false },
  ]);
  const [mood, setMood] = useState(null);

  const metasTotais = metas.length;
  const progresso = (metas.filter(m => m.concluida).length / metasTotais) * 100;
  
  const handleMetaChange = (id) => {
    setMetas(metas.map(meta => 
      meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
    ));
  };

  return (
    <>
      <HeaderPaciente />
      <div className="paciente-dashboard">
        {/* SEÇÃO 1: INÍCIO */}
        <section id="inicio" className="dashboard-section">
          <div className="section-header">
            <Home/>
            <h2>Início</h2>
          </div>
          <div className="welcome-header" style={{textAlign: 'left', padding: '0', boxShadow: 'none'}}>
            <h1>Olá, {nomePaciente}!</h1>
            <p>Continue com o ótimo trabalho. A consistência é a chave do sucesso.</p>
          </div>
          <div className="summary-card-content" style={{marginTop: '1.5rem'}}>
            <p>Você completou {metas.filter(m => m.concluida).length} de {metasTotais} metas hoje.</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progresso}%` }}></div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: MINHAS METAS */}
        <section id="metas" className="dashboard-section">
          <div className="section-header">
            <CheckSquare />
            <h2>Minhas Metas</h2>
          </div>
          <div className="metas-list">
            {metas.map(meta => (
              <div key={meta.id} className={`meta-item ${meta.concluida ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  id={`meta-${meta.id}`} 
                  className="meta-checkbox"
                  checked={meta.concluida}
                  onChange={() => handleMetaChange(meta.id)}
                />
                <label htmlFor={`meta-${meta.id}`}><span>{meta.texto}</span></label>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 3: DIÁRIO PESSOAL */}
        <section id="diario" className="dashboard-section">
          <div className="section-header">
            <BookOpen />
            <h2>Diário Pessoal</h2>
          </div>
          <form className="diario-form">
            <textarea placeholder="Escreva aqui sobre o seu dia..."></textarea>
            <div className="diario-actions">
              <div className="mood-selector">
                <button type="button" className={`mood-btn ${mood === 'feliz' ? 'selected' : ''}`} onClick={() => setMood('feliz')} aria-label="Feliz"><Smile color="#f59e0b"/></button>
                <button type="button" className={`mood-btn ${mood === 'neutro' ? 'selected' : ''}`} onClick={() => setMood('neutro')} aria-label="Neutro"><Meh color="#6b7280"/></button>
                <button type="button" className={`mood-btn ${mood === 'triste' ? 'selected' : ''}`} onClick={() => setMood('triste')} aria-label="Triste"><Frown color="#3b82f6"/></button>
              </div>
              <button type="submit" className="action-btn btn-primary" style={{flex: 'none'}}>Salvar Anotação</button>
            </div>
          </form>
        </section>

        {/* SEÇÃO 4: RECADOS DO PROFISSIONAL */}
        <section id="recados" className="dashboard-section">
          <div className="section-header">
            <MessageSquare />
            <h2>Recados do Profissional</h2>
          </div>
          <div className="recados-list">
            <div className="recado-item">
              <div className="recado-header">
                <span>Dr. Carlos - Há 2 horas</span>
                <ThumbsUp size={18} />
              </div>
              <div className="recado-body">
                <p>Parabéns por completar a caminhada, Maria! É normal sentir cansaço no início. Continue assim que em breve seu corpo se acostuma.</p>
              </div>
            </div>
            <div className="recado-item">
              <div className="recado-header">
                <span>Dr. Carlos - Ontem</span>
              </div>
              <div className="recado-body">
                <p>Ótima escolha de fruta para o café da manhã! Lembre-se de variar as frutas durante a semana para obter diferentes nutrientes.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default HomePaciente;
