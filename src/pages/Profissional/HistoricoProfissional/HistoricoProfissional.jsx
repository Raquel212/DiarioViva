import React, { useState } from 'react';
import { Clock, FileDown, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './historicoProfissional.css';
import Footer from '../../../components/Footer/Footer';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';

function HistoricoProfissional() {
    const allPacientes = {
        '1': { 
            nome: 'Maria Souza', email: 'maria.souza@email.com', peso: '65 kg', altura: '168 cm', 
            alergias: 'Alergia a amendoim.',
            metasConcluidas: [
                'Comer uma fruta no café da manhã',
                'Caminhar por 20 minutos por 3 dias seguidos',
            ],
            diario: [
                { data: '20 de Setembro de 2025', horario: '21:15', texto: 'O dia foi produtivo. Consegui seguir a dieta e fiz a caminhada. Me sinto com mais energia!', mood: 'feliz' },
                { data: '19 de Setembro de 2025', horario: '20:30', texto: 'Consegui fazer a caminhada, mas me senti muito cansada no começo...', mood: 'neutro' },
            ]
        },
        '2': {
            nome: 'João Pedro', email: 'joao.pedro@email.com', peso: '82 kg', altura: '175 cm', 
            alergias: 'Nenhuma alergia conhecida.',
            metasConcluidas: ['Beber 2 litros de água diariamente'],
            diario: [
                { data: '20 de Setembro de 2025', horario: '22:00', texto: 'Tive uma dor de cabeça chata hoje à tarde. Acho que pode ser por causa do remédio novo.', mood: 'triste' },
            ]
        }
    };

    const [selectedPacienteId, setSelectedPacienteId] = useState('1');
    const paciente = allPacientes[selectedPacienteId];

    const handlePrint = () => {
        window.print();
    };

    const handleGerarPdf = () => {
        const input = document.getElementById('reportContent');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${paciente.nome}_historico.pdf`);
        });
    };

    return (
        <>
            <HeaderProfissional />
            <div>
                <div className="section-header_historicoPg">
                    <Clock size={24} />
                    <h2>Histórico do Paciente</h2>
                </div>

                <div className="historico-toolbar_historicoPg">
                    <select
                        value={selectedPacienteId}
                        onChange={(e) => setSelectedPacienteId(e.target.value)}
                    >
                        {Object.keys(allPacientes).map((id) => (
                        <option key={id} value={id}>
                            {allPacientes[id].nome}
                        </option>
                        ))}
                    </select>

                    <div className="actions_historicoPg">
                        <button className="action-btn secondary" onClick={handleGerarPdf}>
                        <FileDown size={18} />
                        Gerar PDF
                        </button>
                        <button className="action-btn" onClick={handlePrint}>
                        <Printer size={18} />
                        Imprimir
                        </button>
                    </div>
                </div>
                <div className="a4-container" id="reportContent">
                    <div className="report_historicoPg">
                        <div className="report-header_historicoPg">
                            <h2>Relatório de Acompanhamento</h2>
                            <p>Paciente: {paciente.nome}</p>
                        </div>
                        
                        <div className="report-section_historicoPg">
                            <h3>Dados Pessoais</h3>
                            <div className="info-grid_historicoPg">
                                <div className="info-item_historicoPg"><strong>Nome Completo</strong><span>{paciente.nome}</span></div>
                                <div className="info-item_historicoPg"><strong>E-mail</strong><span>{paciente.email}</span></div>
                                <div className="info-item_historicoPg"><strong>Peso</strong><span>{paciente.peso}</span></div>
                                <div className="info-item_historicoPg"><strong>Altura</strong><span>{paciente.altura}</span></div>
                                <div className="info-item_historicoPg alergias"><strong>Alergias e Observações</strong><span>{paciente.alergias}</span></div>
                            </div>
                        </div>

                        <div className="report-section_historicoPg">
                            <h3>Metas Concluídas</h3>
                            <ul className="metas-list">
                                {paciente.metasConcluidas.map((meta, index) => (
                                <li key={index} className="meta-item completed">{meta}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="report-section_historicoPg">
                            <h3>Histórico Completo do Diário</h3>
                            <div className="diarios-list_diariosPg">
                                {paciente.diario.map((entry, index) => (
                                    <div className="diario-entry_diariosPg" key={index}>
                                        <div className="diario-entry-header_diariosPg">
                                            <span>{entry.data} às {entry.horario}</span>
                                        </div>
                                        <p className="diario-entry-body_diariosPg">{entry.texto}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HistoricoProfissional;
