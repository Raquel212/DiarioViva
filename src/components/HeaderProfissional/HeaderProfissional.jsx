import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HeartPulse,
  Home,
  Users,
  CheckSquare,
  BookOpen,
  MessageSquare,
  History,
  Bell,
  Edit,
  LogOut,
  Menu,
  X,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./headerProfissional.css";
import Footer from "../Footer/Footer";
import AIAssistant from "../AIAssistant/AIAssistant";

const STORAGE_KEY = "diarioViva_sidebarProfissional_collapsed";

/* Itens do menu principal */
const NAV_ITEMS = [
  { to: "/homeProfissional", icon: Home, label: "Home", end: true },
  // O VerPerfil refere-se a um paciente; marca Pacientes como ativo nessa rota
  { to: "/meusPacienteProfissional", icon: Users, label: "Pacientes", alsoActive: ["/verPerfil"] },
  { to: "/metasProfissional", icon: CheckSquare, label: "Metas" },
  { to: "/diariosProfissional", icon: BookOpen, label: "Diários" },
  { to: "/recadosProfissional", icon: MessageSquare, label: "Recados" },
  { to: "/historicoProfissional", icon: History, label: "Histórico" },
];

/* Itens do menu do usuário (dropdown) */
const DROPDOWN_ITEMS = [
  { to: "/notificacaoProfissional", icon: Bell, label: "Notificações" },
  { to: "/editarPerfilProfissional", icon: Edit, label: "Editar Perfil" },
  { to: "/login", icon: LogOut, label: "Sair" },
];

function Sidebar({ expanded, mobileOpen, onToggleExpand, onCloseMobile }) {
  const { pathname } = useLocation();

  return (
    <aside
      id="sidebarProfissional"
      className={`sidebarProfissional ${expanded ? "" : "collapsed"} ${
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
          {NAV_ITEMS.map(({ to, icon: Icon, label, end, alsoActive }) => (
            <li className="dv-nav-item" key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `dv-nav-link${
                    isActive ||
                    (alsoActive && alsoActive.includes(pathname))
                      ? " active"
                      : ""
                  }`
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

function HeaderProfissional({ children, onToggleMenu }) {
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
        <header className="headerProfissional">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            aria-controls="sidebarProfissional"
          >
            <Menu size={26} />
          </button>

          <div className="userMenuProfissional" ref={userMenuRef}>
            <button
              type="button"
              className="userButtonProfissional"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="Menu do usuário"
              aria-expanded={dropdownOpen}
            >
              <img
                className="userAvatarProfissional"
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=80&h=80&fit=crop"
                alt="Foto do perfil"
              />
              <span className="userNameProfissional">Profissional</span>
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
              <div className="dropdownMenuProfissional">
                <ul className="dropdownListProfissional">
                  {DROPDOWN_ITEMS.map(({ to, icon: Icon, label }) => (
                    <li className="dropdownItemProfissional" key={label}>
                      <Link
                        to={to}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Icon className="dropdownIconProfissional" size={20} />
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

      <AIAssistant role="profissional" />
    </div>
  );
}

export default HeaderProfissional;
