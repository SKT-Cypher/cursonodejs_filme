import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function ConsultarFilme() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nomePesquisa, setNomePesquisa] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:5001/filme";

  // 🔹 Busca filmes da API (com parâmetro opcional de nome)
  const buscarFilmes = async (nome = "") => {
    setCarregando(true);
    try {
      const resposta = await axios.get(API_URL, { params: { nome } });
      setFilmes(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar filmes:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // 🔹 Busca inicial
  useEffect(() => {
    buscarFilmes();
  }, []);

  // 🔹 Pesquisa automática com debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      buscarFilmes(nomePesquisa);
    }, 500); // 500ms após o último caractere digitado

    return () => clearTimeout(delayDebounce); // limpa se digitar novamente
  }, [nomePesquisa]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este filme?");
    if (confirmar) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setFilmes(filmes.filter((f) => f.id !== id));
      } catch (erro) {
        console.error("Erro ao deletar filme:", erro);
        alert("Erro ao deletar filme.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleRowClick = (id) => {
    navigate(`/filme/${id}`);
  };

  if (carregando) {
    return (
      <div className="container">
        <Sidebar />
        <div className="main">
          <div className="table-container">
            <h2>Carregando filmes...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <div className="table-container">
          <h2>Consultar Filmes</h2>

          {/* 🔹 Caixa de pesquisa automática */}
          <form className="form-pesquisa">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={nomePesquisa}
              onChange={(e) => setNomePesquisa(e.target.value)}
            />
            <button type="button" onClick={() => buscarFilmes(nomePesquisa)}>
              <FaSearch />
            </button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data de lançamento</th>
                <th>Avaliação</th>
                <th>Disponível</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filmes.length > 0 ? (
                filmes.map((filme) => {
                  const dataLancamento = filme["lançamento"]
                    ? new Date(filme["lançamento"]).toLocaleDateString("pt-BR")
                    : "N/A";

                  return (
                    <tr
                      key={filme.id}
                      onClick={() => handleRowClick(filme.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{filme.nome || "N/A"}</td>
                      <td>{dataLancamento}</td>
                      <td>{filme.avaliacao !== undefined ? filme.avaliacao : "N/A"}</td>
                      <td>{filme.disponivel ? "Sim" : "Não"}</td>
                      <td className="acoes">
                        <button
                          className="editar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(filme.id);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="deletar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(filme.id);
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
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Nenhum filme encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
