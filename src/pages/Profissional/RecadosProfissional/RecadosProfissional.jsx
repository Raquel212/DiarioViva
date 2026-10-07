import { useState } from 'react';
import { MessageSquare, ThumbsUp, Sparkles, Send } from 'lucide-react';
import './recadosProfissional.css';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import {
  chatCompletion,
  getAIErrorMessage,
  isAIConfigured,
} from '../../../services/ai';

function RecadosProfissional() {
    const [recados, setRecados] = useState([
    {
        id: 1,
        profissional: "Dr. Carlos",
        tempo: "Há 2 horas",
        mensagem:
        "Parabéns por completar a caminhada, Maria! É normal sentir cansaço no início. Continue assim que em breve seu corpo se acostuma.",
        curtidas: 0,
        comentarios: [
        {
            id: 101,
            autor: "Paciente",
            nome: "Maria",
            texto: "Obrigada, doutor! Estou confiante em continuar.",
        },
        ],
    },
    {
        id: 2,
        profissional: "Dr. Carlos",
        tempo: "Ontem",
        mensagem:
        "Ótima escolha de fruta para o café da manhã! Lembre-se de variar as frutas durante a semana para obter diferentes nutrientes.",
        curtidas: 0,
        comentarios: [
            {
            id: 102,
            autor: "Paciente",
            nome: "João",
            texto: "Obrigado, doutor! Irei me lembrar.",
        },
        ],
    },
    {
        id: 3,
        profissional: "Dr. Carlos",
        tempo: "Há 3 dias",
        mensagem:
        "Excelente progresso com os exercícios recomendados. Continue seguindo as orientações e registrando suas atividades.",
        curtidas: 0,
        comentarios: [],
    },
    {
        id: 4,
        profissional: "Dr. Carlos",
        tempo: "Há 5 dias",
        mensagem:
        "Não se esqueça de manter os horários das consultas e exames em dia. Isso ajuda a acompanhar seu progresso de forma segura.",
        curtidas: 0,
        comentarios: [],
    },
    {
        id: 5,
        profissional: "Dr. Carlos",
        tempo: "Há 1 semana",
        mensagem:
        "Lembre-se de hidratar-se corretamente e seguir as orientações do plano de tratamento. Qualquer dúvida, me avise.",
        curtidas: 0,
        comentarios: [],
    },
    ]);


  const [novoComentario, setNovoComentario] = useState({});

  const [novoRecado, setNovoRecado] = useState("");
  const [gerandoRecado, setGerandoRecado] = useState(false);
  const [erroRecado, setErroRecado] = useState("");

  const gerarRecadoComIA = async () => {
    if (!isAIConfigured()) {
      setErroRecado("Configure a IA no assistente flutuante (ícone de brilho ✨) para usar este recurso.");
      return;
    }
    setGerandoRecado(true);
    setErroRecado("");
    try {
      const resposta = await chatCompletion({
        system: `Você é o assistente de um profissional de saúde do DiárioViva.
Escreva um recado curto (2 a 4 frases), em português do Brasil, com tom acolhedor e motivador, para ser enviado a um paciente em acompanhamento.
O recado deve incentivar a continuidade das metas e o registro no diário, mas de forma realista e sem promessas médicas.
Responda apenas com o texto do recado.`,
        messages: [
          {
            role: 'user',
            content: `Escreva um recado de apoio e motivação para um paciente que está seguindo suas metas diárias de saúde.`,
          },
        ],
        maxTokens: 300,
      });
      setNovoRecado(resposta);
    } catch (err) {
      setErroRecado(getAIErrorMessage(err.message || 'AI_SERVER'));
    } finally {
      setGerandoRecado(false);
    }
  };

  const enviarRecado = (e) => {
    e.preventDefault();
    const texto = novoRecado.trim();
    if (!texto || gerandoRecado) return;
    setRecados([
      {
        id: Date.now(),
        profissional: "Dr. Carlos",
        tempo: "Agora",
        mensagem: texto,
        curtidas: 0,
        comentarios: [],
      },
      ...recados,
    ]);
    setNovoRecado("");
    setErroRecado("");
  };

  const handleCurtir = (id) => {
    setRecados(
      recados.map((r) =>
        r.id === id ? { ...r, curtidas: r.curtidas + 1 } : r
      )
    );
  };

  const handleComentarioChange = (id, valor) => {
    setNovoComentario({ ...novoComentario, [id]: valor });
  };

  const handleComentar = (id) => {
    if (!novoComentario[id]?.trim()) return;

    setRecados(
      recados.map((r) =>
        r.id === id
          ? {
              ...r,
              comentarios: [
                ...r.comentarios,
                {
                  id: Date.now(),
                  autor: "Profissional",
                  nome: r.profissional,
                  texto: novoComentario[id],
                },
              ],
            }
          : r
      )
    );

    setNovoComentario({ ...novoComentario, [id]: "" });
  };

  return (
    <>
      <HeaderProfissional>
      <section className="page-section-recadosProfissional">
        <div className="section-header-recadosProfissional">
          <MessageSquare size={28} color="#0d9488" />
          <h2>Recados para o Paciente</h2>
        </div>

        <form className="composer-recados-profissional" onSubmit={enviarRecado}>
          <div className="composer-header">
            <h3>Novo recado</h3>
            <button
              type="button"
              className="composer-ai-btn"
              onClick={gerarRecadoComIA}
              disabled={gerandoRecado}
            >
              <Sparkles size={15} />
              {gerandoRecado ? "Gerando..." : "Gerar com IA"}
            </button>
          </div>
          <textarea
            placeholder="Escreva um recado de apoio ou orientação para o paciente..."
            value={novoRecado}
            onChange={(e) => setNovoRecado(e.target.value)}
            rows={3}
          ></textarea>
          {erroRecado && <p className="composer-error">{erroRecado}</p>}
          <div className="composer-actions">
            <button
              type="submit"
              className="composer-send-btn"
              disabled={!novoRecado.trim() || gerandoRecado}
            >
              <Send size={16} />
              Enviar recado
            </button>
          </div>
        </form>

        <div className="recados-container-recadosProfissional">
          {recados.map((recado) => (
            <div
              key={recado.id}
              className="recado-item-recadosProfissional"
            >
              <div className="recado-header-recadosProfissional">
                <span>
                  {recado.profissional} - {recado.tempo}
                </span>
                <button
                  className="like-btn"
                  onClick={() => handleCurtir(recado.id)}
                >
                  <ThumbsUp size={18} /> {recado.curtidas}
                </button>
              </div>

              <div className="recado-body-recadosProfissional">
                <p>{recado.mensagem}</p>
              </div>

              <div className="comentarios-recadosProfissional">
                {recado.comentarios.map((c) => (
                  <p key={c.id} className="comentario-item">
                    👤 {c.autor} ({c.nome}): {c.texto}
                  </p>
                ))}

                <div className="comentario-form">
                  <input
                    type="text"
                    placeholder="Escreva sua resposta..."
                    value={novoComentario[recado.id] || ""}
                    onChange={(e) =>
                      handleComentarioChange(recado.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleComentar(recado.id)}>
                    Responder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </HeaderProfissional>
    </>
  );
}

export default RecadosProfissional;
