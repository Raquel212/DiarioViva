import './Header.css';
import  { useState } from 'react';
import { HeartPulse, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{ title: "Início", href: "/" }, { title: "Sobre", href: "#sobre" }, { title: "Funcionalidades", href: "#funcionalidades" }, { title: "Depoimentos", href: "#depoimentos" }];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <HeartPulse className="logo-icon" />
          <span>DiárioViva</span>
        </Link>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <a className="navlinks" key={link.title} href={link.href}>{link.title} </a>
          ))}
          <Link to="/login" className="logout-button">Login</Link>
        </nav>

        <div className="menu-button-container">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-button" aria-label="Abrir menu">
            <Menu className="menu-icon" />
          </button>
        </div>
      </div>

      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.title} href={link.href}>{link.title}</a>
        ))}
        <Link to="/login" className="logout-button">Login</Link>
      </nav>
    </header>
  );
}

export default Header;