import {
  NavLink,
  useNavigate
} from "react-router-dom";

import "./index.scss";

import {

  FaSearch,

  FaPlus,

  FaSignOutAlt,

  FaUserShield,

  FaUsers

} from "react-icons/fa";

export default function Sidebar() {

  const navigate =
    useNavigate();


  function logout() {

    localStorage.removeItem(
      "admin-logado"
    );

    localStorage.removeItem(
      "admin-dados"
    );

    navigate("/admin");
  }


  const admin =
    JSON.parse(

      localStorage.getItem(
        "admin-dados"
      )

    );


  return (

    <aside className="sidebar">


      <div className="sidebar-top">


        {/* LOGO */}

        <div className="logo-area">

          <h2 className="logo">

            🎬 CineFlix

          </h2>

         

        </div>



        {/* ADMIN LOGADO */}

        <div className="admin-info">

          <div className="avatar">

            <FaUserShield /> 
            <h4>
              {admin?.nome || "Admin"}
            </h4>


          </div>

          

        </div>



        {/* MENU */}

        <nav>

          <ul>


            {/* FILMES */}

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

                Consultar Filmes

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



            {/* ADMINS */}

            <li>

              <NavLink
                to="/consultarAdm"

                className={({ isActive }) =>

                  isActive
                    ? "ativo"
                    : ""
                }
              >

                <FaUsers />

                Consultar Admins

              </NavLink>

            </li>



            <li>

              <NavLink
                to="/cadastrarAdm"

                className={({ isActive }) =>

                  isActive
                    ? "ativo"
                    : ""
                }
              >

                <FaUserShield />

                Cadastrar Admin

              </NavLink>

            </li>

          </ul>

        </nav>

      </div>



      {/* BOTÃO SAIR */}

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