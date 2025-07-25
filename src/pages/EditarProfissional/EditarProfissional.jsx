import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./editarProfissional.css";

function EditarPerfilProfissional() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    crm: "",
    especialidade: "",
    ufCrm: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");


  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await api.get("perfil/profissional");
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

    try {
      await api.put("perfil/profissional", perfil);
      setMensagem("Perfil salvo com sucesso!");
      navigate("/homeProfissional");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setErro("Não foi possível salvar as alterações no perfil.");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Configurações do Perfil Profissional</h2>
        </div>
        <div className="profile-card-body">
          <div className="avatar-section">
            <img
              src="https://placehold.co/100x100/a7f3d0/1f2937?text=Dr."
              alt="Avatar do Profissional"
              className="avatar-image"
            />
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <h3>Informações Profissionais</h3>

              <div className="form-group">
                <label htmlFor="especialidade">Especialidade</label>
                <input
                  type="text"
                  id="especialidade"
                  className="form-control"
                  value={perfil.especialidade || ""}
                  onChange={handleChange}
                  placeholder="Ex: Nutricionista, Psicólogo"
                />
              </div>

              <div className="form-control-grid">
                <div className="form-group">
                  <label htmlFor="crm">Nº de Inscrição (CRM, CRP, etc.)</label>
                  <input
                    type="text"
                    id="crm"
                    className="form-control"
                    value={perfil.crm || ""}
                    onChange={handleChange}
                    placeholder="Apenas números"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ufCrm">UF</label>
                  <select
                    id="ufCrm"
                    className="form-control"
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

export default EditarPerfilProfissional;