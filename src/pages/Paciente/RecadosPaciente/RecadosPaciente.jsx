import { useState } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import './recadosPaciente.css';
import HeaderPaciente from '../../../components/HeaderPaciente/HeaderPaciente';
import Footer from '../../../components/Footer/Footer';

function RecadosPaciente() {
    const [recados, setRecados] = useState([
        {
            id: 1,
            profissional: "Dr. Carlos",
            tempo: "Há 2 horas",
            mensagem: "Parabéns por completar a caminhada, Maria! É normal sentir cansaço no início. Continue assim que em breve seu corpo se acostuma.",
            curtidas: 0,
            comentarios: []
        },
        {
            id: 2,
            profissional: "Dr. Carlos",
            tempo: "Ontem",
            mensagem: "Ótima escolha de fruta para o café da manhã! Lembre-se de variar as frutas durante a semana para obter diferentes nutrientes.",
            curtidas: 0,
            comentarios: []
        },
        {
            id: 3,
            profissional: "Nutricionista Ana",
            tempo: "Há 3 dias",
            mensagem: "Maria, ótimo trabalho em seguir o plano alimentar. Continue registrando suas refeições no diário.",
            curtidas: 0,
            comentarios: []
        },
        {
            id: 4,
            profissional: "Psicólogo João",
            tempo: "Há 5 dias",
            mensagem: "Lembre-se de reservar um tempo para relaxar. O bem-estar emocional é fundamental para sua saúde geral.",
            curtidas: 0,
            comentarios: []
        },
        {
            id: 5,
            profissional: "Enfermeira Luiza",
            tempo: "Há 1 semana",
            mensagem: "Verifique sua pressão arterial regularmente. Caso sinta tontura, entre em contato comigo.",
            curtidas: 0,
            comentarios: []
        }
    ]);

    const [novoComentario, setNovoComentario] = useState({});

    const handleCurtir = (id) => {
        setRecados(recados.map(r =>
            r.id === id ? { ...r, curtidas: r.curtidas + 1 } : r
        ));
    };

    const handleComentarioChange = (id, valor) => {
        setNovoComentario({ ...novoComentario, [id]: valor });
    };

    const handleComentar = (id) => {
        if (!novoComentario[id]?.trim()) return;
        setRecados(recados.map(r =>
            r.id === id
                ? { ...r, comentarios: [...r.comentarios, novoComentario[id]] }
                : r
        ));
        setNovoComentario({ ...novoComentario, [id]: "" });
    };

    return (
        <>
            <HeaderPaciente />
            <section className="page-section-recadosPaciente">
                <div className="section-header-recadosPaciente">
                    <MessageSquare size={28} color="#0d9488" />
                    <h2>Recados do Profissional</h2>
                </div>

                <div className="recados-container-recadosPaciente">
                    {recados.map(recado => (
                        <div key={recado.id} className="recado-item-recadosPaciente">
                            <div className="recado-header-recadosPaciente">
                                <span>{recado.profissional} - {recado.tempo}</span>
                                <button 
                                    className="like-btn" 
                                    onClick={() => handleCurtir(recado.id)}
                                >
                                    <ThumbsUp size={18} /> {recado.curtidas}
                                </button>
                            </div>
                            <div className="recado-body-recadosPaciente">
                                <p>{recado.mensagem}</p>
                            </div>

                            <div className="comentarios-recadosPaciente">
                                {recado.comentarios.map((c, i) => (
                                    <p key={i} className="comentario-item">💬 {c}</p>
                                ))}
                                <div className="comentario-form">
                                    <input
                                        type="text"
                                        placeholder="Escreva uma resposta..."
                                        value={novoComentario[recado.id] || ""}
                                        onChange={(e) => handleComentarioChange(recado.id, e.target.value)}
                                    />
                                    <button onClick={() => handleComentar(recado.id)}>Responder</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default RecadosPaciente;
