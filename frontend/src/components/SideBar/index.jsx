import {
  NavLink,
  useNavigate
} from "react-router-dom";

import "./index.scss";

import {
  FaSearch,
  FaPlus,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem(
      "adminLogado"
    );

    navigate("/admin");
  }

  return (

    <aside className="sidebar">

      <div className="sidebar-top">

        <h2 className="logo">

          🎬 CineFlix

        </h2>


        <nav>

          <ul>

            <li>

              <NavLink
                to="/consultar"

                className={({ isActive }) =>
                  isActive
                    ? "ativo"
                    : ""
                }
              >

                <FaSearch />

                Consultar Filme

              </NavLink>

            </li>


            <li>

              <NavLink
                to="/cadastrar"

                className={({ isActive }) =>
                  isActive
                    ? "ativo"
                    : ""
                }
              >

                <FaPlus />

                Cadastrar Filme

              </NavLink>

            </li>

          </ul>

        </nav>

      </div>



      <button
        className="btn-sair"
        onClick={logout}
      >

        <FaSignOutAlt />

        Sair

      </button>

    </aside>
  );
}