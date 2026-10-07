import { useState } from 'react';
import { BookOpen, Smile, Meh, Frown, Sparkles, X } from 'lucide-react';
import './diarioPessoal.css';
import HeaderPaciente from '../../../components/HeaderPaciente/HeaderPaciente';
import {
  chatCompletion,
  getAIErrorMessage,
  isAIConfigured,
} from '../../../services/ai';

function DiarioPessoal() {
    const [mood, setMood] = useState(null);
    const [texto, setTexto] = useState('');
    const [aiSugestao, setAiSugestao] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [historico, setHistorico] = useState([
        { data: '12 de Setembro de 2025', texto: 'Consegui fazer a caminhada, mas me senti muito cansada no começo. O café da manhã com a fruta foi ótimo.', mood: 'feliz'},
        { data: '11 de Setembro de 2025', texto: 'Achei difícil evitar o doce depois do almoço. Acabei comendo um chocolate pequeno.', mood: 'triste'},
    ]);

    const today = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

    const MoodIcon = ({ mood }) => {
        switch(mood) {
            case 'feliz': return <Smile color="#f59e0b" />;
            case 'neutro': return <Meh color="#6b7280" />;
            case 'triste': return <Frown color="#3b82f6" />;
            default: return null;
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (!texto.trim() || !mood) return; // não salva se estiver vazio ou sem humor
        const novaEntrada = { data: today, texto, mood };
        setHistorico([novaEntrada, ...historico]); // adiciona no início
        setTexto('');
        setMood(null);
    }

    const gerarSugestaoComIA = async () => {
        if (!isAIConfigured()) {
            setAiError('Configure a IA no assistente flutuante (ícone de brilho ✨ no canto da tela) para usar este recurso.');
            return;
        }
        setAiLoading(true);
        setAiError('');
        try {
            const humor = mood ? { feliz: 'feliz', neutro: 'neutro', triste: 'triste' }[mood] : 'não informado';
            const resposta = await chatCompletion({
                system: `Você é um incentivador gentil e acolhedor do DiárioViva.
Escreva 2 a 4 frases curtas, em português do Brasil, para ajudar o paciente a continuar sua reflexão no diário.
Se um humor foi informado, leve-o em conta (ex.: se o humor é triste, acolha com empatia e sugira algo positivo e realista).
Não use listas nem emojis demais. Responda apenas com a sugestão.`,
                messages: [
                    { role: 'user', content: `Texto atual da anotação: "${texto || '(vazio)'}". Humor de hoje: ${humor}.` },
                ],
                maxTokens: 220,
            });
            setAiSugestao(resposta);
        } catch (err) {
            setAiError(getAIErrorMessage(err.message || 'AI_SERVER'));
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <>
            <HeaderPaciente>
            <main className="diario-container-diarioPessoal">
                <header className="diario-header-diarioPessoal">
                    <BookOpen className="diario-icon-diarioPessoal" size={28} color="#0d9488" />
                    <h2>Diário Pessoal</h2>
                </header>

                <section className="diario-form-section-diarioPessoal">
                    <div className="diario-form-header-diarioPessoal">
                        <h3>Anotação de Hoje</h3>
                        <p>{today}</p>
                    </div>
                    <form className="diario-form-diarioPessoal" onSubmit={handleSave}>
                        <textarea
                            placeholder="Escreva aqui sobre o seu dia..."
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        ></textarea>

                        <button
                            type="button"
                            className="ai-suggestion-btn"
                            onClick={gerarSugestaoComIA}
                            disabled={aiLoading}
                        >
                            <Sparkles size={16} />
                            {aiLoading ? 'Gerando...' : 'Sugestão com IA'}
                        </button>

                        {aiError && <p className="ai-suggestion-error">{aiError}</p>}

                        {aiSugestao && (
                            <div className="ai-suggestion-box">
                                <div className="ai-suggestion-header">
                                    <span><Sparkles size={14} /> Sugestão da IA</span>
                                    <button
                                        type="button"
                                        className="ai-suggestion-close"
                                        onClick={() => setAiSugestao('')}
                                        aria-label="Descartar sugestão"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <p>{aiSugestao}</p>
                                <button
                                    type="button"
                                    className="ai-suggestion-use"
                                    onClick={() => setTexto((prev) => (prev ? prev + '\n\n' + aiSugestao : aiSugestao))}
                                >
                                    Usar no meu diário
                                </button>
                            </div>
                        )}

                        <div className="diario-actions-diarioPessoal">
                            <div className="mood-selector-diarioPessoal">
                                <button type="button" className={`mood-btn-diarioPessoal ${mood === 'feliz' ? 'selected' : ''}`} onClick={() => setMood('feliz')} aria-label="Feliz"><Smile color="#f59e0b"/></button>
                                <button type="button" className={`mood-btn-diarioPessoal ${mood === 'neutro' ? 'selected' : ''}`} onClick={() => setMood('neutro')} aria-label="Neutro"><Meh color="#6b7280"/></button>
                                <button type="button" className={`mood-btn-diarioPessoal ${mood === 'triste' ? 'selected' : ''}`} onClick={() => setMood('triste')} aria-label="Triste"><Frown color="#3b82f6"/></button>
                            </div>
                            <button type="submit" className="action-btn-diarioPessoal">Salvar Anotação</button>
                        </div>
                    </form>
                </section>

                <hr className="divider-diarioPessoal" />

                <section className="diario-history-diarioPessoal">
                    <h3>Histórico de Anotações</h3>
                    <div className="diario-history-list-diarioPessoal">
                        {historico.map((entry, index) => (
                            <div className="diario-entry-diarioPessoal" key={index}>
                                <div className="diario-entry-header-diarioPessoal">
                                    <span>{entry.data}</span>
                                    <MoodIcon mood={entry.mood} />
                                </div>
                                <p className="diario-entry-body-diarioPessoal">{entry.texto}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            </HeaderPaciente>
        </>
    );
}

export default DiarioPessoal;
