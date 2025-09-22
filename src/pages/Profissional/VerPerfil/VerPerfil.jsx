import { useState } from 'react';
import { Phone, Mail, CheckSquare, BookOpen, MessageSquare, Save, Smile, Meh, Frown } from 'lucide-react';
import './verPerfil.css';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import Footer from '../../../components/Footer/Footer';

function VerPerfil() {
    const paciente = {
        nome: 'João Pedro',
        avatar: 'https://i.pravatar.cc/150?u=maria',
        telefone: '(11) 98765-4321',
        email: 'joao.pedro@email.com'
    };

    const metas = [
        { id: 1, texto: 'Comer uma fruta no café da manhã', status: 'concluida' },
        { id: 2, texto: 'Caminhar por 20 minutos', status: 'andamento' },
        { id: 3, texto: 'Beber 2 litros de água', status: 'pendente' },
    ];

    const diario = [
        { data: '19 de Setembro de 2025', horario: '20:30', texto: 'Consegui fazer a caminhada, mas me senti muito cansada no começo...', mood: 'feliz' },
        { data: '18 de Setembro de 2025', horario: '21:00', texto: 'Achei difícil evitar o doce depois do almoço.', mood: 'triste' },
    ];

    const [anotacoes, setAnotacoes] = useState([]);
    const [novaAnotacao, setNovaAnotacao] = useState("");

    const handleAddAnotacao = (e) => {
        e.preventDefault();
        if (!novaAnotacao.trim()) return;

        const nova = {
            id: Date.now(),
            texto: novaAnotacao,
            data: new Date().toLocaleDateString('pt-BR'),
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setAnotacoes([nova, ...anotacoes]);
        setNovaAnotacao(""); 
    };

    const MoodIcon = ({ mood }) => {
        switch (mood) {
            case 'feliz': return <Smile color="#f59e0b" />;
            case 'neutro': return <Meh color="#6b7280" />;
            case 'triste': return <Frown color="#3b82f6" />;
            default: return null;
        }
    };

    return (
        <>
            <HeaderProfissional />

            <section className="page-section-VerPerfil">
                <div className="container-VerPerfil">

                    {/* Cabeçalho do Perfil */}
                    <div className="perfil-header-VerPerfil">
                        <img src={paciente.avatar} alt={paciente.nome} className="perfil-avatar-VerPerfil" />
                        <div className="perfil-header-info-VerPerfil">
                            <h1>{paciente.nome}</h1>
                            <div className="perfil-contato-VerPerfil">
                                <span className="perfil-contato-item-VerPerfil"><Phone style={{ marginTop: "5px" }} size={16} /> {paciente.telefone}</span>
                                <span className="perfil-contato-item-VerPerfil"><Mail style={{ marginTop: "5px" }} size={16} /> {paciente.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metas */}
                    <div className="page-section-VerPerfil">
                        <div className="section-header-VerPerfil">
                            <CheckSquare style={{ marginTop: "20px" }}/>
                            <h2 style={{ marginTop: "18px" }}>Registro de Metas</h2>
                        </div>
                        <div className="metas-list-VerPerfil">
                            {metas.map(meta => (
                                <div key={meta.id} className="list-item-VerPerfil">
                                    <span>{meta.texto}</span>
                                    <span className={`meta-status-VerPerfil ${meta.status}`}>
                                        {meta.status.charAt(0).toUpperCase() + meta.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Histórico do Diário */}
                    <div className="page-section-VerPerfil">
                        <div className="section-header-VerPerfil">
                            <BookOpen style={{ marginTop: "20px" }}/>
                            <h2 style={{ marginTop: "18px" }}>Histórico do Diário</h2>
                        </div>
                        <div className="diario-history-list-VerPerfil">
                            {diario.map((entry, index) => (
                                <div className="diario-entry-VerPerfil" key={index}>
                                    <div className="diario-entry-header-VerPerfil">
                                        <span>{entry.data} às {entry.horario}</span>
                                        <MoodIcon mood={entry.mood} />
                                    </div>
                                    <p className="diario-entry-body-VerPerfil">{entry.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Anotações do Profissional - logo abaixo */}
                    <div className="page-section-VerPerfil">
                        <div className="section-header-VerPerfil">
                            <MessageSquare style={{ marginTop: "20px" }}/>
                            <h2 style={{ marginTop: "18px" }}>Anotações do Profissional</h2>
                        </div>
                        <form className="anotacoes-form-VerPerfil" onSubmit={handleAddAnotacao}>
                            <textarea
                                placeholder="Adicione uma anotação sobre o progresso do paciente..."
                                value={novaAnotacao}
                                onChange={(e) => setNovaAnotacao(e.target.value)}
                            ></textarea>
                            <button type="submit" className="action-btn-VerPerfil">
                                <Save size={18} />
                                Registrar
                            </button>
                        </form>

                        {/* Lista de anotações salvas */}
                        <div className="anotacoes-list-VerPerfil">
                            {anotacoes.length === 0 && <p className="sem-anotacoes-VerPerfil">Nenhuma anotação registrada ainda.</p>}
                            {anotacoes.map(anotacao => (
                                <div key={anotacao.id} className="anotacao-item-VerPerfil">
                                    <div className="anotacao-header-VerPerfil">
                                        <span>{anotacao.data} às {anotacao.hora}</span>
                                    </div>
                                    <p>{anotacao.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default VerPerfil;
