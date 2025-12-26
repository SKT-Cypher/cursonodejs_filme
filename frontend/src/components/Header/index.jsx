import "./index.scss";
import { FaUserCog } from "react-icons/fa"; // ícone de admin


export default function Header() {
  return (
    <header className="header">
      <div className="logo">🎬 CineFlix</div>

      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/movies">Catálogo</a>
        <a href="/sobre">Sobre Nós</a>

      </nav>

      <div className="admin-icon">
        <a href="/admin" title="Administração" >
          <FaUserCog size={25} />
          <p>Admin</p>
        </a>
      </div>
    </header>
  );
}
