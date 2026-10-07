import { useEffect, useRef, useState } from "react";
import {
  HeartPulse,
  Home,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Bell,
  Edit,
  LogOut,
  Menu,
  X,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./headerPaciente.css";
import Footer from "../Footer/Footer";
import AIAssistant from "../AIAssistant/AIAssistant";

const STORAGE_KEY = "diarioViva_sidebarPaciente_collapsed";

/* Itens do menu principal */
const NAV_ITEMS = [
  { to: "/homePaciente", icon: Home, label: "Home", end: true },
  { to: "/minhasMetasPaciente", icon: CheckSquare, label: "Minhas Metas" },
  { to: "/diarioPessoalPaciente", icon: BookOpen, label: "Diário Pessoal" },
  { to: "/recadosPaciente", icon: MessageSquare, label: "Recados" },
];

/* Itens do menu do usuário (dropdown) */
const DROPDOWN_ITEMS = [
  { to: "/notificacaoPaciente", icon: Bell, label: "Notificações" },
  { to: "/editarPerfilPaciente", icon: Edit, label: "Editar Perfil" },
  { to: "/login", icon: LogOut, label: "Sair" },
];

function Sidebar({ expanded, mobileOpen, onToggleExpand, onCloseMobile }) {
  return (
    <aside
      id="sidebarPaciente"
      className={`sidebarPaciente ${expanded ? "" : "collapsed"} ${
        mobileOpen ? "mobile-open" : ""
      }`}
    >
      <div className="dv-brand">
        <div className="dv-brand-logo">
          <HeartPulse size={26} />
        </div>
        <h1 className="dv-brand-name">DiárioViva</h1>
        <button
          type="button"
          className="sidebar-close-mobile"
          onClick={onCloseMobile}
          aria-label="Fechar menu"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="dv-nav" aria-label="Menu principal">
        <p className="dv-nav-label">Principal</p>
        <ul className="dv-nav-list">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <li className="dv-nav-item" key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `dv-nav-link${isActive ? " active" : ""}`
                }
              >
                <span className="dv-nav-chip">
                  <Icon size={20} />
                </span>
                <span className="dv-nav-label-text">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="dv-sidebar-footer">
        <button
          type="button"
          className="dv-collapse-btn"
          onClick={onToggleExpand}
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          title={expanded ? "Recolher menu" : "Expandir menu"}
        >
          {expanded ? <CollapseIcon size={20} /> : <ExpandIcon size={20} />}
        </button>
      </div>
    </aside>
  );
}

function HeaderPaciente({ children, onToggleMenu }) {
  // Sempre inicia expandido. O estado recolhido pode até ser salvo em
  // localStorage, mas ao (re)montar a página voltamos ao expandido para
  // nunca abrir a aplicação com a sidebar estreita/cortada.
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "expanded" : "collapsed");
    } catch {
      /* armazenamento indisponível */
    }
    if (onToggleMenu) onToggleMenu(next);
  };

  const closeMobile = () => setMobileOpen(false);

  /* Fecha o dropdown ao clicar fora ou pressionar Esc */
  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  /* Fecha o menu mobile ao pressionar Esc */
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <div className={`dv-shell ${expanded ? "" : "dv-collapsed"}`}>
      <Sidebar
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggleExpand={toggleExpand}
        onCloseMobile={closeMobile}
      />
      {mobileOpen && (
        <div className="dv-backdrop" onClick={closeMobile} aria-hidden="true" />
      )}

      <div className="dv-shell-body">
        <header className="headerPaciente">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            aria-controls="sidebarPaciente"
          >
            <Menu size={26} />
          </button>

          <div className="userMenuPaciente" ref={userMenuRef}>
            <button
              type="button"
              className="userButtonPaciente"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="Menu do usuário"
              aria-expanded={dropdownOpen}
            >
              <img
                className="userAvatarPaciente"
                src="https://i.pravatar.cc/150?u=Paciente"
                alt="Foto do perfil"
              />
              <span className="userNamePaciente">Paciente</span>
              <svg
                className={`arrowIcon ${dropdownOpen ? "rotate" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="dropdownMenuPaciente">
                <ul className="dropdownListPaciente">
                  {DROPDOWN_ITEMS.map(({ to, icon: Icon, label }) => (
                    <li className="dropdownItemPaciente" key={label}>
                      <Link
                        to={to}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Icon className="dropdownIconPaciente" size={20} />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>

        <main className="dv-shell-content">{children}</main>
        <Footer />
      </div>

      <AIAssistant role="paciente" />
    </div>
  );
}

export default HeaderPaciente;
