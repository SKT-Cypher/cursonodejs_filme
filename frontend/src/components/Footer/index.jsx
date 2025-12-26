import "./index.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <h2>🎬 Cineflix</h2>
          <p>Seu catálogo de filmes favorito</p>
        </div>

        <ul className="footer__links">
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/contato">Contato</a></li>
          <li><a href="/contato">Política de Privacidade</a></li>
        </ul>

        <div className="footer__social">
          <a href="/contato">📘</a>
          <a href="/contato">🐦</a>
          <a href="/contato">📸</a>
        </div>
      </div>

      <div className="footer__copy">
        <p>&copy; {new Date().getFullYear()} MyMovies - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
