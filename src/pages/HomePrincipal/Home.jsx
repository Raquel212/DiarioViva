import './home.css';
import { CheckCircle2, BookHeart, Users, Quote, Link } from 'lucide-react';

function Home() {
  return (
    <>
      <section className="hero-section">
        <h1 className="hero-title">Sua jornada de saúde, conectada e apoiada.</h1>
        <p className="hero-subtitle">Acompanhe seu progresso, compartilhe com seu profissional e alcance seus objetivos de bem-estar com mais motivação.</p>
        <a href="/login" className="login-button">Comece Agora</a>

      </section>

      <section id="sobre" className="section">
        <div className="sobre-container">
          <div className="sobre-text">
            <h2 className="section-title" style={{textAlign: 'left'}}>Uma ponte digital para o seu cuidado</h2>
            <p>
              O DiárioViva nasceu da necessidade de aproximar pacientes e profissionais de saúde. Acreditamos que o acompanhamento contínuo é a chave para um tratamento eficaz e uma vida mais saudável. Nossa plataforma funciona como um diário compartilhado, onde a comunicação flui de forma simples, organizada e inteligente, fortalecendo a confiança e o engajamento.
            </p>
          </div>
          <img src="https://placehold.co/600x400/a7f3d0/1f2937?text=Cuidado+Conectado" alt="Ilustração de uma pessoa conversando com um profissional de saúde online" className="sobre-image" />
        </div>
      </section>
      
      <section id="funcionalidades" className="section funcionalidades-section">
        <h2 className="section-title">Ferramentas para o seu sucesso</h2>
        <p className="section-subtitle">Tudo o que você precisa para transformar seus objetivos em realidade, com o apoio de quem mais entende do assunto.</p>
        <div className="funcionalidades-grid">
          <div className="feature-card">
            <CheckCircle2 size={48} className="feature-icon" />
            <h3>Metas e Tarefas Diárias</h3>
            <p>Receba e acompanhe metas claras definidas pelo seu profissional. Marcar uma tarefa como concluída nunca foi tão gratificante.</p>
          </div>
          <div className="feature-card">
            <BookHeart size={48} className="feature-icon" />
            <h3>Diário Pessoal Inteligente</h3>
            <p>Registre seus pensamentos, sentimentos e desafios. Seu diário é um espaço seguro para autoavaliação e comunicação.</p>
          </div>
          <div className="feature-card">
            <Users size={48} className="feature-icon" />
            <h3>Acompanhamento Profissional</h3>
            <p>Seu profissional tem acesso ao seu progresso, permitindo um feedback rápido, personalizado e muito mais eficaz.</p>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="section">
        <h2 className="section-title">Histórias de quem já usa</h2>
        <p className="section-subtitle">Veja como o DiárioViva está ajudando a transformar a relação entre pacientes e profissionais.</p>
        <div className="depoimentos-grid">
          <div className="testimonial-card">
            <Quote size={32} className="testimonial-quote-icon" />
            <blockquote>A plataforma mudou a forma como eu interajo com meus pacientes. Consigo dar um suporte muito mais próximo e ver o progresso deles em tempo real. É revolucionário!</blockquote>
            <p className="testimonial-author">Dr. Carlos Andrade <span>/ Nutricionista</span></p>
          </div>
          <div className="testimonial-card">
            <Quote size={32} className="testimonial-quote-icon" />
            <blockquote>Ter minhas metas diárias e poder escrever sobre meu dia me manteve muito mais motivada. O feedback rápido da minha terapeuta fez toda a diferença.</blockquote>
            <p className="testimonial-author">Maria S. <span>/ Paciente</span></p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;