import React, { useState } from 'react';
import { BookText, ChevronDown, Smile, Meh, Frown, Heater } from 'lucide-react';
import './diarioProfissional.css';
import Footer from '../../../components/Footer/Footer';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';

function DiariosProfissional() {
    const [pacientes] = useState([
        { id: 1, nome: 'João Pedro', avatar: 'https://i.pravatar.cc/150?u=maria', diarios: [
            { data: '20 de Setembro de 2025', horario: '21:15', texto: 'O dia foi produtivo. Consegui seguir a dieta e fiz a caminhada. Me sinto com mais energia!', mood: 'feliz' },
            { data: '19 de Setembro de 2025', horario: '20:30', texto: 'Consegui fazer a caminhada, mas me senti muito cansada no começo...', mood: 'neutro' },
            { data: '18 de Setembro de 2025', horario: '19:45', texto: 'Hoje não consegui fazer a caminhada. Estava muito cansada e acabei comendo besteiras.', mood: 'triste' },
            { data: '17 de Setembro de 2025', horario: '20:00', texto: 'Fiz a caminhada e me senti bem melhor depois. A alimentação também foi boa!', mood: 'feliz' },
        ]},
        { id: 2, nome: 'Lucas Mendes', avatar: 'https://i.pravatar.cc/150?u=joao', diarios: [
            { data: '20 de Setembro de 2025', horario: '22:00', texto: 'Tive uma dor de cabeça chata hoje à tarde. Acho que pode ser por causa do remédio novo.', mood: 'triste' },
            { data: '19 de Setembro de 2025', horario: '21:30', texto: 'Me senti um pouco melhor hoje. A dor de cabeça diminuiu e consegui trabalhar.', mood: 'neutro' },
            { data: '18 de Setembro de 2025', horario: '20:15', texto: 'A dor de cabeça foi forte hoje. Tive que parar tudo e descansar.', mood: 'triste' },
            { data: '17 de Setembro de 2025', horario: '19:50', texto: 'Hoje foi um bom dia. A dor de cabeça quase não apareceu e consegui fazer minhas tarefas.', mood: 'feliz' },
            { data: '16 de Setembro de 2025', horario: '20:05', texto: 'A dor de cabeça voltou com força hoje. Foi difícil me concentrar no trabalho.', mood: 'triste' },
        ]},
        { id: 3, nome: 'Caio Fernando', avatar: 'https://i.pravatar.cc/150?u=ana', diarios: []},

        { id: 4, nome: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?u=lucas', diarios: []},
    ]);

    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (pacienteId) => {
        setOpenAccordion(openAccordion === pacienteId ? null : pacienteId);
    };

    const MoodIcon = ({mood}) => {
        switch(mood) {
            case 'feliz': return <Smile color="#f59e0b"/>;
            case 'neutro': return <Meh color="#6b7280"/>;
            case 'triste': return <Frown color="#3b82f6"/>;
            default: return null;
        }
    }

    return (

        <>
            <HeaderProfissional />
            <section className="page-section_diariosPg">
                <div className="section-header_diariosPg">
                    <BookText/>
                    <h2>Diários dos Pacientes</h2>
                </div>
                <div className="paciente-accordion_diariosPg">
                    {pacientes.map(paciente => (
                        <div key={paciente.id} className="paciente-item_diariosPg">
                            <div className="paciente-header_diariosPg" onClick={() => toggleAccordion(paciente.id)}>
                                <div className="paciente-info_diariosPg">
                                    <img src={paciente.avatar} alt={paciente.nome} className="paciente-avatar_diariosPg" />
                                    <span className="paciente-name_diariosPg">{paciente.nome}</span>
                                </div>
                                <ChevronDown className={`paciente-toggle-icon_diariosPg ${openAccordion === paciente.id ? 'open' : ''}`} />
                            </div>
                            {openAccordion === paciente.id && (
                                <div className="paciente-diarios-content_diariosPg">
                                    <div className="diarios-list_diariosPg">
                                        {paciente.diarios.length > 0 ? paciente.diarios.map((entry, index) => (
                                            <div className="diario-entry_diariosPg" key={index}>
                                                <div className="diario-entry-header_diariosPg">
                                                    <span>{entry.data} às {entry.horario}</span>
                                                    <MoodIcon mood={entry.mood} />
                                                </div>
                                                <p className="diario-entry-body_diariosPg">{entry.texto}</p>
                                            </div>
                                        )) : <p>Nenhuma anotação no diário ainda.</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <Footer/>
        </>

        
    );
}

export default DiariosProfissional;