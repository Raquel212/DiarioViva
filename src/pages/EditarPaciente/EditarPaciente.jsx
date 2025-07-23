import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './editarPaciente.css';
import api from '../../services/api';

function EditarPerfilPaciente() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    peso: '',
    altura: '',
    dataNascimento: '',
    descricao: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await api.get('/paciente/perfil');
        setPerfil(resposta.data);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setErro('Erro ao carregar dados do perfil.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      await api.put('/paciente/perfil', perfil);
      setMensagem('Perfil atualizado com sucesso!');
      navigate('/homePaciente');
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      setErro('Não foi possível atualizar o perfil.');
    }
  };

  if (carregando) return <p>Carregando...</p>;

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
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" className="form-control" value={perfil.nome} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" className="form-control" value={perfil.email} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input type="date" id="dataNascimento" className="form-control" value={perfil.dataNascimento} onChange={handleChange} />
              </div>
              <div className="form-control-grid">
                <div className="form-group">
                  <label htmlFor="peso">Peso (kg)</label>
                  <input type="number" step="0.1" id="peso" className="form-control" value={perfil.peso} onChange={handleChange} placeholder="Ex: 65.5" />
                </div>
                <div className="form-group">
                  <label htmlFor="altura">Altura (cm)</label>
                  <input type="number" id="altura" className="form-control" value={perfil.altura} onChange={handleChange} placeholder="Ex: 168" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição (alergias, etc.)</label>
                <textarea id="descricao" className="form-control" value={perfil.descricao} onChange={handleChange} placeholder="Descreva aqui informações relevantes..."></textarea>
              </div>

              {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
              {erro && <p style={{ color: 'red' }}>{erro}</p>}

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
