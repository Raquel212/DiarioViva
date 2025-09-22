import { useState } from 'react';
import { CheckSquare, ChevronDown, PlusCircle, Trash2, Edit } from 'lucide-react';
import './metasProfissional.css';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import Footer from '../../../components/Footer/Footer';

function MetasProfissional() {
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: 'João Pedro', avatar: 'https://i.pravatar.cc/150?u=maria', metas: [
      { id: 101, texto: 'Comer uma fruta no café da manhã', prazo: '2025-09-20', comentario: null },
      { id: 102, texto: 'Caminhar por 20 minutos', prazo: '2025-09-20', comentario: 'Pode ser difícil no começo, mas é importante.' },
    ]},
    { id: 2, nome: 'Lucas Mendes', avatar: 'https://i.pravatar.cc/150?u=joao', metas: [
      { id: 201, texto: 'Beber 2 litros de água', prazo: '2025-09-21', comentario: null },
    ]},
    { id: 3, nome: 'Caio Fernando', avatar: 'https://i.pravatar.cc/150?u=ana', metas: []},
    { id: 4, nome: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?u=carlos', metas: [
      { id: 401, texto: 'Reduzir consumo de açúcar', prazo: '2025-09-25', comentario: 'Tente substituir doces por frutas.' },
    ]},
  ]);

  const [openAccordion, setOpenAccordion] = useState(null);
  const [showAddModal, setShowAddModal] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(null); 
  const [showCommentModal, setShowCommentModal] = useState(null); 
  const [novaMeta, setNovaMeta] = useState({ texto: "", prazo: "" });

  const toggleAccordion = (pacienteId) => {
    setOpenAccordion(openAccordion === pacienteId ? null : pacienteId);
  };

  const openAddModal = (pacienteId) => {
    setShowAddModal(pacienteId);
    setNovaMeta({ texto: "", prazo: "" });
  };

  const confirmAddMeta = () => {
    if (!novaMeta.texto || !novaMeta.prazo) return; 

    setPacientes((prev) =>
      prev.map((p) =>
        p.id === showAddModal
          ? {
              ...p,
              metas: [
                ...p.metas,
                {
                  id: Date.now(),
                  texto: novaMeta.texto,
                  prazo: novaMeta.prazo,
                  comentario: null,
                },
              ],
            }
          : p
      )
    );
    setShowAddModal(null);
    setNovaMeta({ texto: "", prazo: "" });
  };

  const openDeleteModal = (pacienteId, metaId) => {
    setShowDeleteModal({ pacienteId, metaId });
  };

  const confirmDeleteMeta = () => {
    if (!showDeleteModal) return;
    setPacientes((prev) =>
      prev.map((p) =>
        p.id === showDeleteModal.pacienteId
          ? { ...p, metas: p.metas.filter((m) => m.id !== showDeleteModal.metaId) }
          : p
      )
    );
    setShowDeleteModal(null);
  };

  const openCommentModal = (pacienteId, metaId) => {
    const paciente = pacientes.find((p) => p.id === pacienteId);
    const meta = paciente?.metas.find((m) => m.id === metaId);
    setShowCommentModal({
      pacienteId,
      metaId,
      comentario: meta?.comentario ?? "",
    });
  };

  const confirmCommentMeta = () => {
    if (!showCommentModal) return;
    const { pacienteId, metaId, comentario } = showCommentModal;

    setPacientes((prev) =>
      prev.map((p) =>
        p.id === pacienteId
          ? {
              ...p,
              metas: p.metas.map((m) =>
                m.id === metaId ? { ...m, comentario: comentario || null } : m
              ),
            }
          : p
      )
    );

    setShowCommentModal(null);
  };

  return (
    <>
      <HeaderProfissional />
      <section className="page-section_metasPg">
        <div className="section-header_metasPg">
          <CheckSquare />
          <h2>Metas dos Pacientes</h2>
        </div>

        <div className="paciente-accordion_metasPg">
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="paciente-item_metasPg">
              <div
                className="paciente-header_metasPg"
                onClick={() => toggleAccordion(paciente.id)}
              >
                <div className="paciente-info_metasPg">
                  <img
                    src={paciente.avatar}
                    alt={paciente.nome}
                    className="paciente-avatar_metasPg"
                  />
                  <span className="paciente-name_metasPg">{paciente.nome}</span>
                </div>
                <ChevronDown
                  className={`paciente-toggle-icon_metasPg ${
                    openAccordion === paciente.id ? "open" : ""
                  }`}
                />
              </div>

              {openAccordion === paciente.id && (
                <div className="paciente-metas-content_metasPg">
                  <div className="metas-list_metasPg">
                    {paciente.metas.length > 0 ? (
                      paciente.metas.map((meta) => (
                        <div key={meta.id} className="meta-item_metasPg">
                          <div className="meta-info_metasPg">
                            <p>{meta.texto}</p>
                            <p className="prazo_metasPg">Prazo: {meta.prazo}</p>
                            {meta.comentario && (
                              <p className="meta-comentario_metasPg">
                                "{meta.comentario}"
                              </p>
                            )}
                          </div>

                          <div className="meta-actions_metasPg">
                            <button
                              onClick={() => openCommentModal(paciente.id, meta.id)}
                              className="meta-action-btn_metasPg"
                              title="Adicionar/Editar Comentário"
                            >
                              <Edit size={18} />
                            </button>

                            <button
                              onClick={() => openDeleteModal(paciente.id, meta.id)}
                              className="meta-action-btn_metasPg delete"
                              title="Excluir Meta"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ marginTop: `10px` }}>Nenhuma meta cadastrada.</p>
                    )}
                  </div>

                  <form
                    className="add-meta-form_metasPg"
                    onSubmit={(e) => {
                      e.preventDefault();
                      openAddModal(paciente.id);
                    }}
                  >
                    <div className="form-group_metasPg">
                      <input type="text" placeholder="Nova meta..." required />
                      <input type="date" required />
                    </div>
                    <button type="submit" className="action-btn_metasPg">
                      <PlusCircle size={18} />
                      Adicionar Meta
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modal Adicionar Meta */}
      {showAddModal && (
        <div className="modal-overlay_metasPg">
          <div className="modal-content_metasPg">
            <h3>Adicionar Nova Meta</h3>
            <input
              type="text"
              placeholder="Descrição da meta"
              value={novaMeta.texto}
              onChange={(e) => setNovaMeta({ ...novaMeta, texto: e.target.value })}
            />
            <input
              type="date"
              value={novaMeta.prazo}
              onChange={(e) => setNovaMeta({ ...novaMeta, prazo: e.target.value })}
            />
            <div className="modal-actions_metasPg">
              <button onClick={confirmAddMeta} className="btn-confirm_metasPg">
                Salvar
              </button>
              <button onClick={() => setShowAddModal(null)} className="btn-cancel_metasPg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Excluir Meta */}
      {showDeleteModal && (
        <div className="modal-overlay_metasPg">
          <div className="modal-content_metasPg">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir esta meta?</p>
            <div className="modal-actions_metasPg">
              <button onClick={confirmDeleteMeta} className="btn-confirm_metasPg">
                Sim
              </button>
              <button onClick={() => setShowDeleteModal(null)} className="btn-cancel_metasPg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Comentário */}
      {showCommentModal && (
        <div className="modal-overlay_metasPg">
          <div className="modal-content_metasPg">
            <h3>Adicionar/Editar Comentário</h3>
            <textarea
              placeholder="Escreva seu comentário..."
              value={showCommentModal.comentario}
              onChange={(e) =>
                setShowCommentModal({ ...showCommentModal, comentario: e.target.value })
              }
              rows={6}
            />
            <div className="modal-actions_metasPg">
              <button onClick={confirmCommentMeta} className="btn-confirm_metasPg">
                Salvar
              </button>
              <button onClick={() => setShowCommentModal(null)} className="btn-cancel_metasPg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MetasProfissional;
