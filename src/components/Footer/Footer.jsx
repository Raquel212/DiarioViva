import './footer.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} DiárioViva. Todos os direitos reservados.</p>
        <p className="footer-tagline">Conectando pacientes e profissionais para uma vida mais saudável.</p>
      </div>
    </footer>
  );
}

export default Footer;