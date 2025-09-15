import { Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./editarPaciente.css";
import Footer from "../../components/Footer/Footer";
import HeaderPaciente from "../../components/HeaderPaciente/HeaderPaciente";

function EditarPerfilPaciente() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nomeCompleto: "Paciente",
    email: "paciente@email.com",
    peso: "",
    altura: "",
    dataNascimento: "",
    comorbidades: "",
  });

  const [erro, setErro] = useState("");
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    try {
      const dadosSalvos = localStorage.getItem("perfilPaciente");
      if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        setPerfil((prev) => ({
          ...prev,
          ...dados,
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

    try {
      const dadosParaSalvar = {
        ...perfil,
        peso: perfil.peso ? parseFloat(perfil.peso) : "",
        altura: perfil.altura ? parseFloat(perfil.altura) : "",
      };

      localStorage.setItem("perfilPaciente", JSON.stringify(dadosParaSalvar));
      setToast("Dados atualizados com sucesso!");
      setTimeout(() => setToast(""), 3000);

      setTimeout(() => {
        navigate("/homePaciente");
      }, 1000);
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
      <HeaderPaciente />

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      <div className="profile-page-container-EditarPaciente">
        <div className="profile-card-EditarPaciente">
          <div className="profile-card-header-EditarPaciente">
            <h2>Configurações do Perfil</h2>
          </div>
          <div className="profile-card-body-EditarPaciente">
            <div className="avatar-section-EditarPaciente">
              <img
                src="https://i.pravatar.cc/150?u=Paciente"
                alt="Avatar"
                className="avatar-image-EditarPaciente"
              />
            </div>
            <div className="form-section-EditarPaciente">
              <form onSubmit={handleSubmit}>
                <h3>Informações Pessoais</h3>

                <div className="form-group-EditarPaciente">
                  <label htmlFor="nomeCompleto">Nome Completo</label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    className="form-control-EditarPaciente"
                    value={perfil.nomeCompleto || ""}
                    readOnly
                  />
                </div>

                <div className="form-group-EditarPaciente">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control-EditarPaciente"
                    value={perfil.email || ""}
                    readOnly
                  />
                </div>

                <div className="form-group-EditarPaciente">
                  <label htmlFor="dataNascimento">Data de Nascimento</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    className="form-control-EditarPaciente"
                    value={perfil.dataNascimento || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control-grid-EditarPaciente">
                  <div className="form-group-EditarPaciente">
                    <label htmlFor="peso">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      id="peso"
                      className="form-control-EditarPaciente"
                      value={perfil.peso || ""}
                      onChange={handleChange}
                      placeholder="Ex: 65.5"
                    />
                  </div>
                  <div className="form-group-EditarPaciente">
                    <label htmlFor="altura">Altura (cm)</label>
                    <input
                      type="number"
                      id="altura"
                      className="form-control-EditarPaciente"
                      value={perfil.altura || ""}
                      onChange={handleChange}
                      placeholder="Ex: 168"
                    />
                  </div>
                </div>

                <div className="form-group-EditarPaciente">
                  <label htmlFor="comorbidades">
                    Comorbidades (alergias, etc.)
                  </label>
                  <textarea
                    id="comorbidades"
                    className="form-control-EditarPaciente"
                    value={perfil.comorbidades || ""}
                    onChange={handleChange}
                    placeholder="Descreva aqui informações relevantes..."
                  ></textarea>
                </div>

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                <div className="profile-actions-EditarPaciente">
                  <button type="submit" className="save-button-EditarPaciente">
                    <Save size={18} />
                    Salvar Alterações
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

export default EditarPerfilPaciente;
