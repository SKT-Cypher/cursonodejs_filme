import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/SideBar";
import axios from "axios";
import "./index.scss";

export default function DetalhesFilme() {
  const { id } = useParams(); // pega o ID da URL
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const IMAGEM_DEFAULT = "https://via.placeholder.com/300x450?text=Sem+Imagem";

  // 🔹 Chama a API para buscar o filme por ID
  useEffect(() => {
    async function buscarFilmePorId() {
      try {
        const response = await axios.get(`http://localhost:5001/filme/${id}`);
        setFilme(response.data);
      } catch (err) {
        console.error("Erro ao buscar filme:", err);
        alert("Filme não encontrado.");
        navigate("/consultar");
      } finally {
        setCarregando(false);
      }
    }

    buscarFilmePorId();
  }, [id, navigate]);

  if (carregando) return <p>Carregando...</p>;
  if (!filme) return <p>Filme não encontrado.</p>;

  const dataLancamento = filme.lançamento
    ? new Date(filme.lançamento).toLocaleDateString("pt-BR")
    : "N/A";

  // 🔹 Ajusta a URL da imagem para substituir backslashes por barras
  const urlImagem = filme.img
    ? `http://localhost:5001/${filme.img.replaceAll("\\", "/")}`
    : IMAGEM_DEFAULT;

  return (
    <div className="pagina-detalhes-filme">
      <Sidebar />
      <main className="conteudo">
        <h1>{filme.nome || "Título não disponível"}</h1>
        <div className="detalhes-container">
          <img src={urlImagem} alt={filme.nome} />
          <div className="infos">
            <p>
              <strong>Sinopse:</strong> {filme.sinopse || "Sinopse não disponível"}
            </p>
            <p>
              <strong>Avaliação:</strong>{" "}
              {filme.avaliacao !== undefined ? `${filme.avaliacao}/10` : "N/A"}
            </p>
            <p>
              <strong>Lançamento:</strong> {dataLancamento}
            </p>
            <p>
              <strong>Disponível:</strong> {filme.disponivel ? "Sim" : "Não"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
