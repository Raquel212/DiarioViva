import {
  Home,
  Users,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Activity,
  Star,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import './homeProfissional.css';

function HomeProfissional() {
  const nomeProfissional = 'Dr. Carlos';

  const stats = [
    { id: 1, icon: Users, label: 'Pacientes Ativos', value: '12', grad: 'dv-ic-teal' },
    { id: 2, icon: CheckCircle2, label: 'Metas cumpridas hoje', value: '8', grad: 'dv-ic-orange' },
    { id: 3, icon: BookOpen, label: 'Novas anotações', value: '3', grad: 'dv-ic-blue' },
  ];

  const pacientesRecentes = [
    { id: 1, nome: 'Maria Souza', info: 'Enviou diário há 2 horas' },
    { id: 2, nome: 'João Pedro', info: 'Última meta concluída ontem' },
    { id: 3, nome: 'Ana Beatriz', info: 'Iniciou acompanhamento na semana passada' },
  ];

  const ultimosRecados = [
    { id: 1, paciente: 'Maria Souza', texto: 'Parabéns por completar a caminhada, Maria!', tempo: 'Há 5 minutos' },
    { id: 2, paciente: 'João Pedro', texto: 'Lembre-se de beber mais água durante o dia.', tempo: 'Há 3 horas' },
  ];

  return (
    <HeaderProfissional>
      <div className="profissional-dashboard dv-home-prof">
        {/* HERO */}
        <section className="dv-hero">
          <div className="dv-hero-text">
            <span className="dv-hero-date">
              <Activity size={15} /> Painel do Profissional
            </span>
            <h1>Olá, {nomeProfissional}! 👨‍⚕️</h1>
            <p>Acompanhe aqui o progresso dos seus pacientes em tempo real.</p>
          </div>
          <div className="dv-hero-badge">
            <Star size={26} />
            <div>
              <strong>3.2k</strong>
              <span>interações</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="dv-stats">
          {stats.map(({ id, icon: Icon, label, value, grad }) => (
            <div className="dv-stat-card" key={id}>
              <div className={`dv-stat-icon ${grad}`}><Icon size={22} /></div>
              <div className="dv-stat-info">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ATIVIDADE / TENDÊNCIA */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <TrendingUp size={20} />
              <h2>Atividade recente</h2>
            </div>
            <span className="dv-section-sub">+18%</span>
          </div>
          <div className="dv-trend">
            <div className="dv-trend-bar dv-bar-1" />
            <div className="dv-trend-bar dv-bar-2" />
            <div className="dv-trend-bar dv-bar-3" />
            <div className="dv-trend-bar dv-bar-4" />
            <div className="dv-trend-bar dv-bar-5" />
            <div className="dv-trend-bar dv-bar-6" />
            <div className="dv-trend-bar dv-bar-7" />
          </div>
          <div className="dv-trend-labels">
            <span>Seg</span><span>Ter</span><span>Qua</span>
            <span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
          </div>
        </section>

        {/* PACIENTES RECENTES */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <Users size={20} />
              <h2>Pacientes Recentes</h2>
            </div>
            <ClipboardList size={20} className="dv-section-soft" />
          </div>
          <div className="dv-list">
            {pacientesRecentes.map((p) => (
              <div className="dv-list-item" key={p.id}>
                <div className="dv-list-avatar">{p.nome.charAt(0)}</div>
                <div className="dv-list-info">
                  <p>{p.nome}</p>
                  <span>{p.info}</span>
                </div>
                <div className="dv-list-dot" title="Ativo" />
              </div>
            ))}
          </div>
          <a href="/meusPacienteProfissional" className="dv-link-more">
            Ver todos os pacientes <ArrowRight size={16} />
          </a>
        </section>

        {/* ÚLTIMOS RECADOS */}
        <section className="dv-section">
          <div className="dv-section-head">
            <div className="dv-section-title">
              <MessageSquare size={20} />
              <h2>Últimos Recados Enviados</h2>
            </div>
          </div>
          <div className="dv-list">
            {ultimosRecados.map((r) => (
              <div className="dv-list-item dv-recado" key={r.id}>
                <div className="dv-list-info">
                  <p>Para: {r.paciente}</p>
                  <span>"{r.texto}"</span>
                </div>
                <span className="dv-list-time">{r.tempo}</span>
              </div>
            ))}
          </div>
          <a href="/recadosProfissional" className="dv-link-more">
            Ver todos os recados <ArrowRight size={16} />
          </a>
        </section>
      </div>
    </HeaderProfissional>
  );
}

export default HomeProfissional;
