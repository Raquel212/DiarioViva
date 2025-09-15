import { useState } from 'react';
import { CheckSquare, PlusCircle } from 'lucide-react';
import './minhasMetas.css';
import HeaderPaciente from '../../../components/HeaderPaciente/HeaderPaciente';
import Footer from '../../../components/Footer/Footer';

function MinhasMetas() {
    const [metas, setMetas] = useState([
        { id: 1, texto: 'Comer uma fruta no café da manhã', concluida: true },
        { id: 2, texto: 'Caminhar por 20 minutos', concluida: false },
        { id: 3, texto: 'Comer uma fruta antes de dormir', concluida: false },
        { id: 4, texto: 'Beber 2 litros de água', concluida: false },
    ]);

    const [novaMeta, setNovaMeta] = useState('');

    const handleMetaChange = (id) => {
        setMetas(metas.map(meta => 
            meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
        ));
    };

    const handleAddMeta = (e) => {
        e.preventDefault();
        if (!novaMeta.trim()) return;

        const novaEntrada = {
            id: Date.now(), // 🔑 garante que cada meta terá um id único
            texto: novaMeta,
            concluida: false
        };

        setMetas([novaEntrada, ...metas]); 
        setNovaMeta('');
    };

    return (
        <>
            <HeaderPaciente />
            <section className="page-section-minhasMetasPaciente">
                <div className="section-header-minhasMetasPaciente">
                    <CheckSquare size={28} color="#0d9488" />
                    <h2>Minhas Metas</h2>
                </div>

                <div className="metas-container-minhasMetasPaciente">
                    <form className="metas-form-minhasMetasPaciente" onSubmit={handleAddMeta}>
                        <input
                            type="text"
                            placeholder="Digite uma nova meta..."
                            value={novaMeta}
                            onChange={(e) => setNovaMeta(e.target.value)}
                        />
                        <button type="submit" className="add-meta-btn-minhasMetasPaciente">
                            <PlusCircle size={20} />
                            Adicionar
                        </button>
                    </form>

                    <div className="metas-list-minhasMetasPaciente">
                        {metas.map(meta => (
                            <div 
                                key={meta.id} 
                                className={`meta-item-minhasMetasPaciente ${meta.concluida ? 'completed' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`meta-${meta.id}`}
                                    className="meta-checkbox-minhasMetasPaciente"
                                    checked={meta.concluida}
                                    onChange={() => handleMetaChange(meta.id)}
                                />
                                <label htmlFor={`meta-${meta.id}`}>{meta.texto}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default MinhasMetas;
