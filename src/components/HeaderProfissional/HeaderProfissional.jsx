import { useState } from 'react';
import { HeartPulse, Home, Users, CheckSquare, BookOpen, MessageSquare, History, Bell, Edit, LogOut } from 'lucide-react';
import './headerProfissional.css';  

const iconProps = {
    className: "navIconProfissional",
    color: "#0d9488" 
};

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside className={`sidebarProfissional ${isOpen ? '' : 'collapsed'}`}>
            <div className="sidebarHeaderProfissional">
                <HeartPulse className="logoHomeProfissional" size={32} color="#0d9488" />
                <h1 className="sidebarTitleProfissional">DiarioViva</h1>
            </div>
            <nav className="sidebarNavProfissional">
                <ul className="navListProfissional">
                    <li className="navItemProfissional">
                        <a href="/homeProfissional">
                            <Home className="navIconProfissional" />
                            <span className="navLabel">Home</span>
                        </a>
                    </li>
                    <li className="navItemProfissional">
                        <a href="/meusPacienteProfissional">
                            <Users className="navIconProfissional" />
                            <span className="navLabel">Pacientes</span>
                        </a>
                    </li>
                    <li className="navItemProfissional">
                        <a href="/metasProfissional">
                            <CheckSquare className="navIconProfissional" />
                            <span className="navLabel">Metas</span>
                        </a>
                    </li>
                    <li className="navItemProfissional">
                        <a href="/diariosProfissional">
                            <BookOpen className="navIconProfissional" />
                            <span className="navLabel">Diários</span>
                        </a>
                    </li>
                    <li className="navItemProfissional">
                        <a href="/recadosProfissional">
                            <MessageSquare className="navIconProfissional" />
                            <span className="navLabel">Recados</span>
                        </a>
                    </li>
                    <li className="navItemProfissional">
                        <a href="/historicoProfissional">
                            <History className="navIconProfissional" />
                            <span className="navLabel">Histórico</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebarFooterProfissional">
                <button className="toggleButtonProfissional" onClick={toggleSidebar}>
                    {isOpen ? <span>⮜</span> : <span>⮞</span>}
                </button>
            </div>
        </aside>
    );
}

function HeaderProfissional({ onToggleMenu }) {
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
            <header className="headerProfissional">
                <div className="userMenuProfissional">
                    <button className="userButtonProfissional" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img className="userAvatarProfissional" src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=80&h=80&fit=crop" alt="Foto do perfil" />
                        <span className="userNameProfissional">Profissional</span>
                        <svg className={`arrowIcon ${dropdownOpen ? 'rotate' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="dropdownMenuProfissional">
                            <ul className="dropdownListProfissional">
                                <li className="dropdownItemProfissional">
                                    <a href="/notificacaoProfissional">
                                        <Bell {...iconProps} />
                                        Notificações
                                    </a>
                                </li>
                                <li className="dropdownItemProfissional">
                                    <a href="/editarPerfilProfissional">
                                        <Edit {...iconProps} />
                                        Editar Perfil
                                    </a>
                                </li>
                                <li className="dropdownItemProfissional">
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

export default HeaderProfissional;
