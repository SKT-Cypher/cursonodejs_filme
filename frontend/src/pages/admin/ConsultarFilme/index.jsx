import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar";
import {
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

import axios from "axios";
import api from "../../../api";

import "./index.scss";

import { useNavigate } from "react-router-dom";

export default function ConsultarFilme() {

  const [filmes, setFilmes] = useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const [nomePesquisa, setNomePesquisa] =
    useState("");

  const [modalAberto, setModalAberto] =
    useState(false);

  const [filmeSelecionado, setFilmeSelecionado] =
    useState(null);

  const navigate = useNavigate();

  const API_URL =
    "http://localhost:5000/filme";


  // BUSCAR FILMES

  const buscarFilmes = async (
    nome = ""
  ) => {

    setCarregando(true);

    try {

      const resposta =
        await axios.get(
          API_URL,
          {
            params: { nome }
          }
        );

      setFilmes(resposta.data);

    }

    catch (erro) {

      console.error(
        "Erro ao buscar filmes:",
        erro
      );
    }

    finally {

      setCarregando(false);
    }
  };


  // BUSCA INICIAL

  useEffect(() => {

    buscarFilmes();

  }, []);


  // PESQUISA AUTOMÁTICA

  useEffect(() => {

    const delayDebounce =
      setTimeout(() => {

        buscarFilmes(
          nomePesquisa
        );

      }, 500);

    return () =>
      clearTimeout(
        delayDebounce
      );

  }, [nomePesquisa]);


  // DELETAR

  const handleDelete = async () => {

    try {

      await api.delete(
        `${API_URL}/${filmeSelecionado}`
      );

      setFilmes(
        filmes.filter(
          (f) =>
            f.id !== filmeSelecionado
        )
      );

      setModalAberto(false);

    }

    catch (erro) {

      console.error(
        "Erro ao deletar filme:",
        erro
      );

      alert(
        "Erro ao deletar filme."
      );
    }
  };


  // EDITAR

  const handleEdit = (id) => {

    navigate(`/editar/${id}`);
  };


  // ABRIR DETALHES

  const handleRowClick = (id) => {

    navigate(`/filme/${id}`);
  };


  // LOADING

  if (carregando) {

    return (

      <div className="container">

        <Sidebar />

        <div className="main">

          <div className="table-container">

            <h2>
              Carregando filmes...
            </h2>

          </div>

        </div>

      </div>
    );
  }


  return (

    <div className="container-d">

      <Sidebar />


      <div className="main">

        <div className="table-container">

          <h2>
            Consultar Filmes
          </h2>


          {/* PESQUISA */}

          <form className="form-pesquisa">

            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={nomePesquisa}
              onChange={(e) =>
                setNomePesquisa(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                buscarFilmes(
                  nomePesquisa
                )
              }
            >

              <FaSearch />

            </button>

          </form>



          {/* TABELA */}

          <table>

            <thead>

              <tr>

                <th>
                  Título
                </th>

                <th>
                  Data de lançamento
                </th>

                <th>
                  Avaliação
                </th>

                <th>
                  Disponível
                </th>

                <th>
                  Ações
                </th>

              </tr>

            </thead>


            <tbody>

              {filmes.length > 0 ? (

                filmes.map((filme) => {

                  const dataLancamento =
                    filme.lancamento
                      ? new Date(
                          filme.lancamento
                        ).toLocaleDateString(
                          "pt-BR"
                        )
                      : "N/A";

                  return (

                    <tr
                      key={filme.id}
                      onClick={() =>
                        handleRowClick(
                          filme.id
                        )
                      }
                      style={{
                        cursor: "pointer"
                      }}
                    >

                      <td>
                        {filme.nome || "N/A"}
                      </td>

                      <td>
                        {dataLancamento}
                      </td>

                      <td>

                        {filme.avaliacao !==
                        undefined
                          ? filme.avaliacao
                          : "N/A"}

                      </td>

                      <td>

                        {filme.disponivel
                          ? "Sim"
                          : "Não"}

                      </td>

                      <td className="acoes">

                        <button
                          className="editar"
                          onClick={(e) => {

                            e.stopPropagation();

                            handleEdit(
                              filme.id
                            );
                          }}
                        >

                          <FaEdit />

                        </button>


                        <button
                          className="deletar"
                          onClick={(e) => {

                            e.stopPropagation();

                            setFilmeSelecionado(
                              filme.id
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
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign:
                        "center"
                    }}
                  >

                    Nenhum filme encontrado.

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
              Deletar Filme
            </h3>

            <p>
              Essa ação não poderá
              ser desfeita.
              Deseja realmente remover
              este filme?
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