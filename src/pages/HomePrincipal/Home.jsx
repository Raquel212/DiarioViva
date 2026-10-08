import { useEffect, useRef, useState } from 'react';
import './home.css';
import {
  CheckCircle2,
  BookHeart,
  Users,
  Quote,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Activity,
  Clock,
  ShieldCheck,
  TrendingUp,
  Crown,
  ArrowRight,
  CalendarHeart,
  ClipboardList,
} from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ImgHome from "../../assets/Img_Home.png";


function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function AnimatedNumber({ end, duration = 1600 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * end));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}</span>;
}

const stats = [
  { icon: Users, end: 12, suffix: 'k+', label: 'Pacientes ativos' },
  { icon: Stethoscope, end: 950, suffix: '+', label: 'Profissionais' },
  { icon: Activity, end: 40, suffix: 'k', label: 'Diários registrados' },
  { icon: Sparkles, end: 98, suffix: '%', label: 'Nível de satisfação' },
];

const plans = [
  {
    name: 'Essencial',
    price: '0',
    period: '/mês',
    icon: Activity,
    highlight: false,
    features: ['Diário pessoal de saúde', 'Metas diárias básicas', 'Histórico de 30 dias', 'Suporte por e-mail'],
    cta: 'Começar grátis',
  },
  {
    name: 'Viva +',
    price: '29,90',
    period: '/mês',
    icon: Crown,
    highlight: true,
    features: ['Tudo do Essencial', 'Acompanhamento profissional ilimitado', 'Histórico completo', 'Relatórios de progresso', 'Suporte prioritário'],
    cta: 'Assinar Viva +',
  },
  {
    name: 'Gestão',
    price: '49,90',
    period: '/mês',
    icon: ClipboardList,
    highlight: false,
    features: ['Tudo do Viva +', 'Gestão de múltiplos pacientes', 'Métricas e insights por paciente', 'Convide sua equipe', 'Suporte dedicado 24/7'],
    cta: 'Conhecer Gestão',
  },
];

const testimonials = [
  {
    quote:
      'A plataforma mudou a forma como eu interajo com meus pacientes. Consigo dar um suporte muito mais próximo e ver o progresso deles em tempo real. É revolucionário!',
    author: 'Dr. Carlos Andrade',
    role: 'Nutricionista',
  },
  {
    quote:
      'Ter minhas metas diárias e poder escrever sobre meu dia me manteve muito mais motivada. O feedback rápido da minha terapeuta fez toda a diferença.',
    author: 'Maria S.',
    role: 'Paciente',
  },
  {
    quote:
      'Ferramenta essencial no meu consultório. A gestão integrada de diários e metas me trouxe clareza e economia de tempo em cada sessão.',
    author: 'Dra. Fernanda Lima',
    role: 'Psicóloga',
  },
];

const features = [
  {
    icon: CheckCircle2,
    title: 'Metas e Tarefas Diárias',
    text: 'Receba e acompanhe metas claras definidas pelo seu profissional. Marcar uma tarefa como concluída nunca foi tão gratificante.',
  },
  {
    icon: BookHeart,
    title: 'Diário Pessoal Inteligente',
    text: 'Registre seus pensamentos, sentimentos e desafios. Seu diário é um espaço seguro para autoavaliação e comunicação.',
  },
  {
    icon: Users,
    title: 'Acompanhamento Profissional',
    text: 'Seu profissional tem acesso ao seu progresso, permitindo um feedback rápido, personalizado e muito mais eficaz.',
  },
  {
    icon: CalendarHeart,
    title: 'Rotina sob Controle',
    text: 'Organize consultas, lembretes e hábitos em um só lugar. A gestão da sua saúde começa com uma rotina bem planejada.',
  },
  {
    icon: TrendingUp,
    title: 'Insights e Progresso',
    text: 'Visualize sua evolução com gráficos e relatórios claros. Dados que transformam o cuidado em resultados concretos.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade e Segurança',
    text: 'Seus dados protegidos com os mais altos padrões de segurança e sigilo. Sua confiança é a nossa prioridade.',
  },
];

function Home() {
  useReveal();

  return (
    <>
      <Header />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-grid" />

        <div className="hero-container">
          <div className="hero-content reveal">
            <span className="hero-badge">
              <HeartPulse size={16} /> Cuidado que transforma vidas
            </span>
            <h1 className="hero-title">
              Sua jornada de saúde,{' '}
              <span className="gradient-text">conectada</span> e{' '}
              <span className="gradient-text">apoiada</span>.
            </h1>
            <p className="hero-subtitle">
              Acompanhe seu progresso, compartilhe com seu profissional e alcance
              seus objetivos de bem-estar com mais motivação, tecnologia e cuidado humano.
            </p>
            <div className="hero-actions">
              <a href="/login" className="btn btn-primary">
                Comece Agora <ArrowRight size={18} />
              </a>
              <a href="/cadastro" className="btn btn-ghost">
                <Sparkles size={18} /> Criar conta grátis
              </a>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack">
                <span className="avatar">A</span>
                <span className="avatar">M</span>
                <span className="avatar">J</span>
                <span className="avatar plus">+</span>
              </div>
              <p>
                <strong>+12 mil pessoas</strong> cuidando da saúde hoje
              </p>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-card-main">
              <div className="hc-top">
                <Stethoscope className="hc-icon" />
                <div>
                  <p className="hc-label">Progresso semanal</p>
                  <p className="hc-value">+24% <span>vs. semana passada</span></p>
                </div>
              </div>
              <div className="hc-bars">
                <span style={{ height: '40%' }} />
                <span style={{ height: '65%' }} />
                <span style={{ height: '50%' }} />
                <span style={{ height: '80%' }} />
                <span style={{ height: '100%' }} />
              </div>
            </div>

            <div className="hero-float-card float-card-1">
              <CheckCircle2 className="float-icon" />
              <div>
                <p className="float-title">Meta concluída</p>
                <p className="float-text">Caminhada de 30 min</p>
              </div>
            </div>

            <div className="hero-float-card float-card-2">
              <Clock className="float-icon" />
              <div>
                <p className="float-title">Lembrete</p>
                <p className="float-text">Consulta às 15h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats-bar">
        <div className="stats-container">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-header">
                <s.icon className="stat-icon" size={22} />
                <p className="stat-number">
                  <AnimatedNumber end={s.end} />{s.suffix}
                </p>
              </div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="section">
        <div className="sobre-container">
          <div className="sobre-text reveal">
            <span className="eyebrow">Sobre o DiárioViva</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Uma ponte digital para o seu cuidado
            </h2>
            <p>
              O DiárioViva nasceu da necessidade de aproximar pacientes e profissionais
              de saúde. Acreditamos que o acompanhamento contínuo é a chave para um
              tratamento eficaz e uma vida mais saudável. Nossa plataforma funciona como
              um diário compartilhado, onde a comunicação flui de forma simples, organizada
              e inteligente, fortalecendo a confiança e o engajamento.
            </p>
            <ul className="sobre-list">
              <li><CheckCircle2 size={20} /> Tecnologia a serviço do cuidado humano</li>
              <li><CheckCircle2 size={20} /> Comunicação simples entre todos</li>
              <li><CheckCircle2 size={20} /> Gestão de saúde em um só lugar</li>
            </ul>
          </div>
          <div className="sobre-image-wrap reveal">
            <img src={ImgHome} alt="Ilustração" className="sobre-image" />
          </div>
        </div>
      </section>

      {/* ============ BANNER DESTAQUE ============ */}
      <section className="banner-section">
        <div className="banner-glow" />
        <div className="banner-grid" />
        <div className="banner-content reveal">
          <span className="banner-tag"><HeartPulse size={16} /> Novidade</span>
          <h2 className="banner-title">
            Cuidado que transforma vidas, <span className="gradient-text">na palma da sua mão</span>
          </h2>
          <p className="banner-text">
            Centralize diários, metas, consultas e relatórios. Dê ao seu time e aos seus
            pacientes uma experiência única de cuidado contínuo — do primeiro contato ao
            resultado final.
          </p>
          <div className="banner-actions">
            <a href="/cadastro" className="btn btn-light">
              Quero começar <ArrowRight size={18} />
            </a>
          </div>
          <div className="banner-pills">
            <span><Stethoscope size={16} /> Gestão clínica</span>
            <span><Activity size={16} /> Monitoramento</span>
            <span><TrendingUp size={16} /> Resultados</span>
          </div>
        </div>
      </section>

      {/* ============ FUNCIONALIDADES ============ */}
      <section id="funcionalidades" className="section funcionalidades-section">
        <div className="reveal">
          <span className="eyebrow">Funcionalidades</span>
          <h2 className="section-title">Ferramentas para o seu sucesso</h2>
          <p className="section-subtitle">
            Tudo o que você precisa para transformar objetivos em realidade, com o apoio
            de quem mais entende do assunto.
          </p>
        </div>
        <div className="funcionalidades-grid">
          {features.map((f, i) => (
            <div className="feature-card reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="feature-icon-wrap">
                <f.icon size={30} className="feature-icon" />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PLANOS DE SAÚDE ============ */}
      <section id="planos" className="section planos-section">
        <div className="reveal">
          <span className="eyebrow">Planos de saúde</span>
          <h2 className="section-title">Escolha o plano ideal para você</h2>
          <p className="section-subtitle">
            Do cuidado pessoal à gestão completa de saúde, temos o plano perfeito para
            cada etapa da sua jornada.
          </p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div
              className={`plan-card reveal ${plan.highlight ? 'plan-highlight' : ''}`}
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlight && <span className="plan-popular">Mais popular</span>}
              <div className="plan-head">
                <plan.icon className="plan-icon" size={26} />
                <h3>{plan.name}</h3>
              </div>
              <p className="plan-price">
                <span className="plan-currency">R$</span>
                {plan.price}
                <span className="plan-period">{plan.period}</span>
              </p>
              <ul className="plan-features">
                {plan.features.map((feat, j) => (
                  <li key={j}>
                    <CheckCircle2 size={18} /> {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/cadastro"
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ DEPOIMENTOS ============ */}
      <section id="depoimentos" className="section depoimentos-section">
        <div className="reveal">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="section-title">Histórias de quem já usa</h2>
          <p className="section-subtitle">
            Veja como o DiárioViva está ajudando a transformar a relação entre pacientes
            e profissionais.
          </p>
        </div>
        <div className="depoimentos-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card reveal" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <Quote size={32} className="testimonial-quote-icon" />
              <blockquote>{t.quote}</blockquote>
              <p className="testimonial-author">
                {t.author} <span>/ {t.role}</span>
              </p>
              <div className="testimonial-stars">
                {'★★★★★'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="cta-final">
        <div className="cta-glow" />
        <div className="cta-content reveal">
          <h2 className="cta-title">Pronto para transformar sua saúde?</h2>
          <p className="cta-text">
            Junte-se ao DiárioViva e descubra como a tecnologia pode dar vida ao seu cuidado.
          </p>
          <div className="cta-actions">
            <a href="/cadastro" className="btn btn-primary btn-lg">
              Criar conta gratuita <ArrowRight size={20} />
            </a>
            <a href="/login" className="btn btn-ghost-light">Já tenho conta</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
