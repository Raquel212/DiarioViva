import { useState } from 'react';
import { HeartPulse, Home, CheckSquare, BookOpen, MessageSquare, Bell, Edit, LogOut } from 'lucide-react';
import './headerPaciente.css';  

const iconProps = {
    className: "navIconPaciente",
    color: "#0d9488" 
};

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside className={`sidebarPaciente ${isOpen ? 'active' : ''} ${isOpen ? '' : 'collapsed'}`}>
            <div className="sidebarHeaderPaciente">
                <HeartPulse className="logoHomePaciente" size={32} color="#0d9488" />
                <h1 className="sidebarTitlePaciente">DiarioViva</h1>
            </div>
            <nav className="sidebarNavPaciente">
                <ul className="navListPaciente">
                    <li className="navItemPaciente">
                        <a href="/homePaciente">
                            <Home className="navIconPaciente" />
                            <span className="navLabel">Home</span>
                        </a>
                    </li>
                    <li className="navItemPaciente">
                        <a href="/minhasMetasPaciente">
                            <CheckSquare className="navIconPaciente" />
                            <span className="navLabel">Minhas Metas</span>
                        </a>
                    </li>
                    <li className="navItemPaciente">
                        <a href="/diarioPessoalPaciente">
                            <BookOpen className="navIconPaciente" />
                            <span className="navLabel">Diário Pessoal</span>
                        </a>
                    </li>
                    <li className="navItemPaciente">
                        <a href="/recadosPaciente">
                            <MessageSquare className="navIconPaciente" />
                            <span className="navLabel">Recados</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebarFooterPaciente">
                <button className="toggleButtonPaciente" onClick={toggleSidebar}>
                    {isOpen ? <span>⮜</span> : <span>⮞</span>}
                </button>
            </div>
        </aside>
    );
}

function HeaderPaciente({ onToggleMenu }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        const newState = !sidebarOpen;
        setSidebarOpen(newState);
        if (onToggleMenu) onToggleMenu(newState);
    };

    return (
        <>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <header className="headerPaciente">
                <div className="userMenuPaciente">
                    <button className="userButtonPaciente" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img className="userAvatarPaciente" src="https://i.pravatar.cc/150?u=Paciente" alt="Foto do perfil" />
                        <span className="userNamePaciente">Paciente</span>
                        <svg className={`arrowIcon ${dropdownOpen ? 'rotate' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="dropdownMenuPaciente">
                            <ul className="dropdownListPaciente">
                                <li className="dropdownItemPaciente">
                                    <a href="/notificacaoPaciente">
                                        <Bell {...iconProps} />
                                        Notificações
                                    </a>
                                </li>
                                <li className="dropdownItemPaciente">
                                    <a href="/editarPerfilPaciente">
                                        <Edit {...iconProps} />
                                        Editar Perfil
                                    </a>
                                </li>
                                <li className="dropdownItemPaciente">
                                    <a href="/login">
                                        <LogOut {...iconProps} />
                                        Sair
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default HeaderPaciente;
