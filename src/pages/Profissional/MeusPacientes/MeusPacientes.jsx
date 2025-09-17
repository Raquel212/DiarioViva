import { useState } from 'react';
import { Users, Search, PlusCircle, MoreVertical } from 'lucide-react';
import './meusPacientes.css';
import HeaderProfissional from '../../../components/HeaderProfissional/HeaderProfissional';
import Footer from '../../../components/Footer/Footer';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay-MeusPacientes" onClick={onClose}>
      <div className="modal-content-MeusPacientes" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-MeusPacientes" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function MeusPacientes() {
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: 'João Pedro', avatar: 'https://i.pravatar.cc/150?u=maria', ultimaAtividade: 'Enviou diário há 2 horas', progresso: 66, status: 'Ativo' },
    { id: 2, nome: 'Lucas Mendes', avatar: 'https://i.pravatar.cc/150?u=joao', ultimaAtividade: 'Meta concluída ontem', progresso: 100, status: 'Ativo' },
    { id: 3, nome: 'Caio Fernando', avatar: 'https://i.pravatar.cc/150?u=ana', ultimaAtividade: 'Iniciou acompanhamento', progresso: 0, status: 'Ativo' },
    { id: 4, nome: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?u=lucas', ultimaAtividade: 'Sem atividade há 1 semana', progresso: 0, status: 'Inativo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const [newPaciente, setNewPaciente] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const filteredPacientes = pacientes.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handleAddPaciente = (e) => {
    e.preventDefault();

    if (!newPaciente.nome || !newPaciente.email) {
        alert("Preencha pelo menos nome e email!");
        return;
    }

    const existe = pacientes.some(p => p.email && p.email.toLowerCase() === newPaciente.email.toLowerCase());
    if (existe) {
        alert("Já existe um paciente com esse e-mail!");
        return;
    }

    const novo = {
        id: pacientes.length + 1,
        nome: newPaciente.nome,
        email: newPaciente.email,       
        telefone: newPaciente.telefone,
        avatar: `https://i.pravatar.cc/150?u=${newPaciente.email}`,
        ultimaAtividade: 'Novo paciente adicionado',
        progresso: 0,  
        status: 'Ativo'
    };

    setPacientes([...pacientes, novo]);
    setNewPaciente({ nome: '', email: '', telefone: '' });
    setShowAddModal(false);
    };


  return (
    <>
      <HeaderProfissional />
      <section className="page-section-MeusPacientes">
        <div className="container-MeusPacientes">
          <div className="section-header-MeusPacientes">
            <Users />
            <h2>Meus Pacientes</h2>
          </div>
          <div className="toolbar-MeusPacientes">
            <div className="search-container-MeusPacientes">
              <Search className="search-icon-MeusPacientes" size={20} />
              <input 
                type="text" 
                className="search-input-MeusPacientes" 
                placeholder="Pesquisar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="action-btn-MeusPacientes"
              onClick={() => setShowAddModal(true)}
            >
              <PlusCircle size={20}/>
              <span>Adicionar Novo Paciente</span>
            </button>
          </div>
          <div className="table-wrapper-MeusPacientes">
            <table className="pacientes-table-MeusPacientes">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Última Atividade</th>
                  <th>Progresso Hoje</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.map(paciente => (
                  <tr key={paciente.id}>
                    <td>
                      <div className="paciente-info-MeusPacientes">
                        <img src={paciente.avatar} alt={paciente.nome} className="paciente-avatar-MeusPacientes" />
                        <span className="paciente-name-MeusPacientes">{paciente.nome}</span>
                      </div>
                    </td>
                    <td>{paciente.ultimaAtividade}</td>
                    <td>
                        <div className="progress-wrapper">
                            <div className="progress-bar-container-MeusPacientes">
                            <div
                                className="progress-bar-MeusPacientes"
                                style={{ width: `${paciente.progresso}%` }}
                            ></div>
                            </div>
                            <span className="progress-text">{paciente.progresso}%</span>
                        </div>
                    </td>
                    <td>
                      <span className={`status-badge ${paciente.status === 'Ativo' ? 'active' : 'inactive'}`}>
                        {paciente.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="action-menu-btn-MeusPacientes"
                        onClick={() => setSelectedPaciente(paciente)}
                      >
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal Adicionar Paciente */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h3>Adicionar Novo Paciente</h3>
          <form className="form-add-paciente-MeusPacientes" onSubmit={handleAddPaciente}>
            <input 
              type="text" 
              placeholder="Nome do paciente"
              value={newPaciente.nome}
              onChange={(e) => setNewPaciente({ ...newPaciente, nome: e.target.value })}
            />
            <input 
              type="email" 
              placeholder="Email do paciente"
              value={newPaciente.email}
              onChange={(e) => setNewPaciente({ ...newPaciente, email: e.target.value })}
            />
            <input 
              type="tel" 
              placeholder="Telefone do paciente"
              value={newPaciente.telefone}
              onChange={(e) => setNewPaciente({ ...newPaciente, telefone: e.target.value })}
            />
            <button type="submit">Salvar</button>
          </form>
        </Modal>
      )}

      {/* Modal Ações Paciente */}
      {selectedPaciente && (
        <Modal onClose={() => setSelectedPaciente(null)}>
          <h3>Ações para {selectedPaciente.nome}</h3>
          <ul className="paciente-actions-MeusPacientes">
            <li><button><a href="/verPerfil">Ver Perfil</a></button></li>
            <li><button>Enviar Mensagem</button></li>
            <li><button>Remover Paciente</button></li>
          </ul>
        </Modal>
      )}

      <Footer />
    </>
  );
}

export default MeusPacientes;
