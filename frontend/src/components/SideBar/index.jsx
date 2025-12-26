import { Link } from "react-router-dom";
import "./index.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🎬 Filmes</h2>
      <nav>
        <ul>
          <li><Link to="/consultar">Consultar Filme</Link></li>
          <li><Link to="/cadastrar">Cadastrar Filme</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
