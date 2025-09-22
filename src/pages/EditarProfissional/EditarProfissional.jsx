import { Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./editarProfissional.css";
import Footer from "../../components/Footer/Footer";
import HeaderProfissional from "../../components/HeaderProfissional/HeaderProfissional";

function EditarPerfilProfissional() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "Carlos Silva",
    email: "profissional@email.com",
    crm: "",
    especialidade: "",
    ufCrm: "",
  });

  const [erro, setErro] = useState("");
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const ufs = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
    "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
    "RR","SC","SP","SE","TO"
  ];

  useEffect(() => {
    try {
      const perfilSalvo = JSON.parse(localStorage.getItem("perfilProfissional"));
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      if (usuarioLogado) {
        setPerfil((prev) => ({
          ...prev,
          nome: usuarioLogado.nome || "",
          email: usuarioLogado.email || "",
          crm: perfilSalvo?.crm || "",
          especialidade: perfilSalvo?.especialidade || "",
          ufCrm: perfilSalvo?.ufCrm || "",
        }));
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setErro("Erro ao carregar dados do perfil.");
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!perfil.especialidade || !perfil.crm || !perfil.ufCrm) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      localStorage.setItem("perfilProfissional", JSON.stringify(perfil));
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      if (usuarioLogado) {
        usuarioLogado.perfilCompleto = true;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      }

      setToast("Perfil salvo com sucesso!");
      setTimeout(() => setToast(""), 3000);

      setTimeout(() => navigate("/homeProfissional"), 1000);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setErro("Não foi possível salvar as alterações no perfil.");
    }
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <HeaderProfissional />

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      <div className="profile-page-container-EditarProfissional">
        <div className="profile-card-EditarProfissional">
          <div className="profile-card-header-EditarProfissional">
            <h2>Concluir Perfil Profissional</h2>
          </div>
          <div className="profile-card-body-EditarProfissional">
            <div className="avatar-section-EditarProfissional">
              <img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=80&h=80&fit=crop"
                alt="Avatar do Profissional"
                className="avatar-image-EditarProfissional"
              />
            </div>
            <div className="form-section-EditarProfissional">
              <form onSubmit={handleSubmit}>
                <h3>Informações Profissionais</h3>

                <div className="form-group-EditarProfissional">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    className="form-control-EditarProfissional"
                    value={perfil.nome || ""}
                    readOnly
                  />
                </div>

                <div className="form-group-EditarProfissional">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control-EditarProfissional"
                    value={perfil.email || ""}
                    readOnly
                  />
                </div>

                <div className="form-group-EditarProfissional">
                  <label htmlFor="especialidade">Especialidade</label>
                  <input
                    type="text"
                    id="especialidade"
                    className="form-control-EditarProfissional"
                    value={perfil.especialidade || ""}
                    onChange={handleChange}
                    placeholder="Ex: Nutricionista, Psicólogo"
                  />
                </div>

                <div className="form-control-grid-EditarProfissional">
                  <div className="form-group-EditarProfissional">
                    <label htmlFor="crm">Nº de Inscrição (CRM, CRP, etc.)</label>
                    <input
                      type="text"
                      id="crm"
                      className="form-control-EditarProfissional"
                      value={perfil.crm || ""}
                      onChange={handleChange}
                      placeholder="Apenas números"
                    />
                  </div>
                  <div className="form-group-EditarProfissional">
                    <label htmlFor="ufCrm">UF</label>
                    <select
                      id="ufCrm"
                      className="form-control-EditarProfissional"
                      value={perfil.ufCrm || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      {ufs.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                <div className="profile-actions-EditarProfissional">
                  <button type="submit" className="save-button-EditarProfissional">
                    <Save size={18} />
                    Salvar Perfil
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => setShowModal(true)}
                  >
                    <Trash2 size={18} />
                    Excluir Conta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Tem certeza que deseja excluir sua conta?</h3>
            <p>Essa ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="confirm-delete-button" onClick={handleDeleteAccount}>
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default EditarPerfilProfissional;
