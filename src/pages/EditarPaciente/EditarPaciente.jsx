import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./editarPaciente.css";

function EditarPerfilPaciente() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    peso: "",
    altura: "",
    dataNascimento: "",
    comorbidades: "",
  });

  const [isNewProfile, setIsNewProfile] = useState(false); 
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await api.get("api/perfil/paciente");

        if (resposta.data.peso === null) {
          setIsNewProfile(true);
        }

        setPerfil(resposta.data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setErro("Erro ao carregar dados do perfil.");
      } 
    }

    carregarPerfil();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    const dadosParaSalvar = {
      ...perfil,
      peso: perfil.peso ? parseFloat(perfil.peso) : null,
      altura: perfil.altura ? parseFloat(perfil.altura) : null,
    };

    try {
      if (isNewProfile) {
        await api.post("api/perfil/paciente", dadosParaSalvar);
        setMensagem("Perfil criado com sucesso!");
      } else {
        await api.put("api/perfil/paciente", dadosParaSalvar);
        setMensagem("Perfil atualizado com sucesso!");
      }

      navigate("/homePaciente");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setErro("Não foi possível salvar as alterações no perfil.");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Configurações do Perfil</h2>
        </div>
        <div className="profile-card-body">
          <div className="avatar-section">
            <img
              src="https://placehold.co/100x100/a7f3d0/1f2937?text=MS"
              alt="Avatar"
              className="avatar-image"
            />
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <h3>Informações Pessoais</h3>
              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input
                  type="date"
                  id="dataNascimento"
                  className="form-control"
                  value={perfil.dataNascimento || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control-grid">
                <div className="form-group">
                  <label htmlFor="peso">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    id="peso"
                    className="form-control"
                    value={perfil.peso || ""}
                    onChange={handleChange}
                    placeholder="Ex: 65.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="altura">Altura (cm)</label>
                  <input
                    type="number"
                    id="altura"
                    className="form-control"
                    value={perfil.altura || ""}
                    onChange={handleChange}
                    placeholder="Ex: 168"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="comorbidades">
                  Comorbidades (alergias, etc.)
                </label>
                <textarea
                  id="comorbidades"
                  className="form-control"
                  value={perfil.comorbidades || ""}
                  onChange={handleChange}
                  placeholder="Descreva aqui informações relevantes..."
                ></textarea>
              </div>
              {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
              {erro && <p style={{ color: "red" }}>{erro}</p>}
              <div className="profile-actions">
                <button type="submit" className="save-button">
                  <Save size={18} />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarPerfilPaciente;