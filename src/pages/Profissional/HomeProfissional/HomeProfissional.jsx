import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import Footer from '../../../components/Footer/Footer';
import { Home, Users, CheckCircle2, BookOpen } from 'lucide-react';
import './homeProfissional.css';

function HomeProfissional() {
    const nomeProfissional = "Dr. Carlos";

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
        <>
            <HeaderProfissional />
            
            <div className="profissional-dashboard">
                {/* SEÇÃO 1: VISÃO GERAL */}
                <section id="inicio" className="dashboard-section">
                    <div className="section-header">
                        <Home />
                        <h2>Visão Geral</h2>
                    </div>
                    <div className="welcome-header" style={{textAlign: 'left', padding: '0', boxShadow: 'none'}}>
                        <h1>Olá, {nomeProfissional}!</h1>
                        <p>Acompanhe aqui o progresso dos seus pacientes.</p>
                    </div>

                    <div className="summary-grid" style={{marginTop: '1.5rem'}}>
                        <div className="summary-card">
                            <div className="summary-card-icon pacientes"><Users size={24}/></div>
                            <div className="summary-card-info">
                                <h3>12</h3>
                                <p>Pacientes Ativos</p>
                            </div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-card-icon metas"><CheckCircle2 size={24}/></div>
                            <div className="summary-card-info">
                                <h3>8</h3>
                                <p>Metas Cumpridas Hoje</p>
                            </div>
                        </div>
                        <div className="summary-card">
                            <div className="summary-card-icon diarios"><BookOpen size={24}/></div>
                            <div className="summary-card-info">
                                <h3>3</h3>
                                <p>Novas Anotações</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 2: PACIENTES RECENTES */}
                <section id="pacientes" className="dashboard-section">
                    <div className="section-header">
                        <Users />
                        <h2>Pacientes Recentes</h2>
                    </div>
                    <div className="list-content">
                        {pacientesRecentes.map(p => (
                            <div key={p.id} className="list-item">
                                <div className="list-item-avatar">{p.nome.charAt(0)}</div>
                                <div className="list-item-info">
                                    <p>{p.nome}</p>
                                    <span>{p.info}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#" className="view-all-link">Ver todos os pacientes</a>
                </section>

                {/* SEÇÃO 3: ÚLTIMOS RECADOS */}
                <section id="recados" className="dashboard-section">
                    <div className="section-header">
                        <BookOpen />
                        <h2>Últimos Recados Enviados</h2>
                    </div>
                    <div className="list-content">
                        {ultimosRecados.map(r => (
                            <div key={r.id} className="list-item-recado">
                                <div className="list-item-info">
                                    <p>Para: {r.paciente}</p>
                                    <span>"{r.texto}"</span>
                                </div>
                                <span className="list-item-action">{r.tempo}</span>
                            </div>
                        ))}
                    </div>
                    <a href="#" className="view-all-link">Ver todos os recados</a>
                </section>
            </div>

            <Footer />
        </>
    );
}

export default HomeProfissional;
