import { useState } from 'react';
import {
  Home,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  Flame,
  Target,
  TrendingUp,
  CalendarDays,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import HeaderPaciente from '../../../components/HeaderPaciente/HeaderPaciente';
import './homePaciente.css';

function HomePaciente() {
  const nomePaciente = 'Maria';

  const [metas, setMetas] = useState([
    { id: 1, texto: 'Comer uma fruta no café da manhã', concluida: true },
    { id: 2, texto: 'Caminhar por 20 minutos', concluida: false },
    { id: 3, texto: 'Beber 2 litros de água', concluida: false },
  ]);
  const [mood, setMood] = useState(null);

  const metasTotais = metas.length;
  const concluidas = metas.filter((m) => m.concluida).length;
  const progresso = (concluidas / metasTotais) * 100;

  const handleMetaChange = (id) => {
    setMetas((prev) =>
      prev.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <HeaderPaciente>
      <div className="paciente-dashboard dv-home">
        {/* HERO / BOAS-VINDAS */}
        <section className="dv-hero">
          <div className="dv-hero-text">
            <span className="dv-hero-date">{hoje}</span>
            <h1>Olá, {nomePaciente}! 👋</h1>
            <p>
              Continue com o ótimo trabalho. A consistência é a chave do seu{' '}
              <strong>bem-estar</strong>.
            </p>
          </div>
          <div className="dv-hero-badge">
            <Flame size={30} />
            <div>
              <strong>{concluidas}/{metasTotais}</strong>
              <span>metas hoje</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="dv-stats">
          <div className="dv-stat-card">
            <div className="dv-stat-icon dv-stat-teal"><CheckSquare size={22} /></div>
            <div className="dv-stat-info">
              <strong>{concluidas}/{metasTotais}</strong>
              <span>Metas cumpridas</span>
            </div>
          </div>
          <div className="dv-stat-card">
            <div className="dv-stat-icon dv-stat-orange"><Target size={22} /></div>
            <div className="dv-stat-info">
              <strong>{progresso.toFixed(0)}%</strong>
              <span>de progresso</span>
            </div>
          </div>
          <div className="dv-stat-card">
            <div className="dv-stat-icon dv-stat-blue"><TrendingUp size={22} /></div>
            <div className="dv-stat-info">
              <strong>3 dias</strong>
              <span>de sequência</span>
            </div>
          </div>
        </section>

        {/* PROGRESSO DO DIA */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <CalendarDays size={20} />
              <h2>Progresso de hoje</h2>
            </div>
            <span className="dv-section-sub">{progresso.toFixed(0)}%</span>
          </div>
          <div className="dv-progress-track">
            <div className="dv-progress-fill" style={{ width: `${progresso}%` }} />
          </div>
          <p className="dv-progress-label">
            Você completou <strong>{concluidas} de {metasTotais}</strong> metas hoje. Continue assim!
          </p>
        </section>

        {/* MINHAS METAS */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <CheckSquare size={20} />
              <h2>Minhas Metas</h2>
            </div>
          </div>
          <div className="dv-metas">
            {metas.map((meta) => (
              <label
                key={meta.id}
                className={`dv-meta ${meta.concluida ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={meta.concluida}
                  onChange={() => handleMetaChange(meta.id)}
                />
                <span className="dv-meta-check" />
                <span className="dv-meta-text">{meta.texto}</span>
              </label>
            ))}
          </div>
        </section>

        {/* DIÁRIO RÁPIDO */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <BookOpen size={20} />
              <h2>Diário Rápido</h2>
            </div>
          </div>
          <form
            className="dv-diario"
            onSubmit={(e) => e.preventDefault()}
          >
            <textarea placeholder="Escreva aqui sobre o seu dia..." />
            <div className="dv-diario-actions">
              <div className="dv-mood">
                <span>Como você se sente?</span>
                <div className="dv-mood-btns">
                  <button
                    type="button"
                    className={`dv-mood-btn ${mood === 'feliz' ? 'selected' : ''}`}
                    onClick={() => setMood('feliz')}
                    aria-label="Feliz"
                  >
                    <Smile color="#f59e0b" size={22} />
                  </button>
                  <button
                    type="button"
                    className={`dv-mood-btn ${mood === 'neutro' ? 'selected' : ''}`}
                    onClick={() => setMood('neutro')}
                    aria-label="Neutro"
                  >
                    <Meh color="#6b7280" size={22} />
                  </button>
                  <button
                    type="button"
                    className={`dv-mood-btn ${mood === 'triste' ? 'selected' : ''}`}
                    onClick={() => setMood('triste')}
                    aria-label="Triste"
                  >
                    <Frown color="#3b82f6" size={22} />
                  </button>
                </div>
              </div>
              <button type="submit" className="dv-btn-primary">
                <Sparkles size={18} /> Salvar anotação
              </button>
            </div>
          </form>
        </section>

        {/* RECADOS */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <MessageSquare size={20} />
              <h2>Recados do Profissional</h2>
            </div>
          </div>
          <div className="dv-recados">
            <article className="dv-recado">
              <div className="dv-recado-head">
                <span className="dv-recado-author">
                  <span className="dv-recado-avatar">C</span>
                  Dr. Carlos
                </span>
                <span className="dv-recado-time">Há 2 horas</span>
              </div>
              <p>
                Parabéns por completar a caminhada, Maria! É normal sentir
                cansaço no início. Continue assim — em breve seu corpo se
                acostuma.
              </p>
              <span className="dv-recado-like"><ThumbsUp size={16} /> 1 curtida</span>
            </article>
            <article className="dv-recado">
              <div className="dv-recado-head">
                <span className="dv-recado-author">
                  <span className="dv-recado-avatar">C</span>
                  Dr. Carlos
                </span>
                <span className="dv-recado-time">Ontem</span>
              </div>
              <p>
                Ótima escolha de fruta para o café da manhã! Lembre-se de
                variar as frutas durante a semana para obter diferentes
                nutrientes.
              </p>
            </article>
          </div>
        </section>

        <a href="/diarioPessoalPaciente" className="dv-link-more">
          Ver meu diário <ArrowRight size={16} />
        </a>
      </div>
    </HeaderPaciente>
  );
}

export default HomePaciente;
