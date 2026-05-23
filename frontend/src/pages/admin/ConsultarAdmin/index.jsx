import React, {
  useEffect,
  useState
} from "react";

import Sidebar from "../../../components/SideBar";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserShield
} from "react-icons/fa";

import axios from "axios";
import api from "../../../api";

import "./index.scss";

import { useNavigate } from "react-router-dom";

export default function ConsultarAdmin() {

  const [admins, setAdmins] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const [nomePesquisa, setNomePesquisa] =
    useState("");

  const [modalAberto, setModalAberto] =
    useState(false);

  const [adminSelecionado, setAdminSelecionado] =
    useState(null);

  const navigate =
    useNavigate();

  const API_URL =
    "http://localhost:5000/admin";


  // =========================
  // BUSCAR ADMINS
  // =========================

  const buscarAdmins = async () => {

    setCarregando(true);

    try {

      const resposta =
        await api.get(API_URL);

      const adminsFiltrados =
        resposta.data.filter((a) =>

          a.nome
            ?.toLowerCase()
            .includes(
              nomePesquisa.toLowerCase()
            )
        );

      setAdmins(adminsFiltrados);
    }

    catch (erro) {

      console.error(
        "Erro ao buscar admins:",
        erro
      );
    }

    finally {

      setCarregando(false);
    }
  };


  // =========================
  // INICIAL
  // =========================

  useEffect(() => {

    buscarAdmins();

  }, []);


  // =========================
  // PESQUISA AUTOMÁTICA
  // =========================

  useEffect(() => {

    const delayDebounce =
      setTimeout(() => {

        buscarAdmins();

      }, 500);

    return () =>
      clearTimeout(
        delayDebounce
      );

  }, [nomePesquisa]);


  // =========================
  // DELETAR
  // =========================

  async function handleDelete() {

    try {

      await api.delete(
        `${API_URL}/${adminSelecionado}`
      );

      setAdmins(

        admins.filter(
          (a) =>
            a.id !== adminSelecionado
        )
      );

      setModalAberto(false);
    }

    catch (erro) {

      console.error(erro);

      alert(
        "Erro ao deletar admin."
      );
    }
  }


  // =========================
  // EDITAR
  // =========================

  function handleEdit(id) {

    navigate(
      `/editarAdmin/${id}`
    );
  }


  // =========================
  // LOADING
  // =========================

  if (carregando) {

    return (

      <div className="container-c">

        <Sidebar />

        <div className="main">

          <div className="table-container">

            <h2>
              Carregando admins...
            </h2>

          </div>

        </div>

      </div>
    );
  }


  return (

    <div className="container-c">

      <Sidebar />


      <div className="main">

        <div className="table-container">

          <div className="topo-tabela">

            <h2>

              <FaUserShield />

              Consultar Admins

            </h2>

          </div>



          {/* PESQUISA */}

          <form className="form-pesquisa">

            <input
              type="text"
              placeholder="Pesquisar admin..."
              value={nomePesquisa}
              onChange={(e) =>
                setNomePesquisa(
                  e.target.value
                )
              }
            />

            <button type="button">

              <FaSearch />

            </button>

          </form>



          {/* TABELA */}

          <table>

            <thead>

              <tr>

                <th>
                  Nome
                </th>

                <th>
                  Email
                </th>

                <th>
                  Senha
                </th>

                <th>
                  CPF
                </th>

                <th>
                  Ações
                </th>

              </tr>

            </thead>


            <tbody>

              {admins.length > 0 ? (

                admins.map((admin) => (

                  <tr key={admin.id}>

                    <td>
                      {admin.nome}
                    </td>

                    <td>
                      {admin.email}
                    </td>

                    <td>
                      {admin.senha}
                    </td>

                    <td>
                      {admin.cpf}
                    </td>

                    <td className="acoes">

                      <button
                        className="editar"
                        onClick={() =>
                          handleEdit(
                            admin.id
                          )
                        }
                      >

                        <FaEdit />

                      </button>



                      <button
                        className="deletar"
                        onClick={() => {

                          setAdminSelecionado(
                            admin.id
                          );

                          setModalAberto(
                            true
                          );
                        }}
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign:
                        "center"
                    }}
                  >

                    Nenhum admin encontrado.

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* MODAL */}

      {modalAberto && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-icon">

              🗑️

            </div>

            <h3>
              Deletar Admin
            </h3>

            <p>
              Essa ação não poderá
              ser desfeita.
            </p>

            <div className="modal-buttons">

              <button
                className="cancelar"
                onClick={() =>
                  setModalAberto(
                    false
                  )
                }
              >

                Cancelar

              </button>



              <button
                className="confirmar"
                onClick={handleDelete}
              >

                Deletar

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}