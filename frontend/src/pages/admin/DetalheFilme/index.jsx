import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/SideBar";
import axios from "axios";
import "./index.scss";

export default function DetalhesFilme() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);

  const [carregando, setCarregando] = useState(true);

  const IMAGEM_DEFAULT =
    "https://via.placeholder.com/300x450?text=Sem+Imagem";


  // =========================
  // BUSCAR FILME
  // =========================

  useEffect(() => {

    async function buscarFilmePorId() {

      try {

        const response = await axios.get(
          `http://localhost:5000/filme/${id}`
        );

        console.log(response.data);

        setFilme(response.data);

      }

      catch (err) {

        console.error(
          "Erro ao buscar filme:",
          err
        );

        alert("Filme não encontrado.");

        navigate("/consultar");
      }

      finally {

        setCarregando(false);
      }
    }

    buscarFilmePorId();

  }, [id, navigate]);


  // =========================
  // LOADING
  // =========================

  if (carregando)
    return <p>Carregando...</p>;

  if (!filme)
    return <p>Filme não encontrado.</p>;


  // =========================
  // DATA FORMATADA
  // =========================

  const dataLancamento =
    filme.lancamento
      ? new Date(
          filme.lancamento
        ).toLocaleDateString("pt-BR")
      : "N/A";


  // =========================
  // URL IMAGEM
  // =========================

  const urlImagem =
    filme.imagem

      ? `http://localhost:5000/storage/capa/${filme.imagem}`

      : IMAGEM_DEFAULT;


  return (

  <div className="pagina-detalhes-filme">

    <Sidebar />

    <main className="conteudo">

      <div className="filme-card">

        <div className="capa-container">

          <img
            src={urlImagem}
            alt={filme.nome}
          />

        </div>


        <div className="infos">

          <h1>
            {filme.nome ||
              "Título não disponível"}
          </h1>


          <div className="badges">

            <span className="badge nota">
              ⭐ {filme.avaliacao || "N/A"}/10
            </span>

            <span className="badge data">
              📅 {dataLancamento}
            </span>

            <span
              className={
                filme.disponivel
                  ? "badge disponivel"
                  : "badge indisponivel"
              }
            >

              {filme.disponivel
                ? "Disponível"
                : "Indisponível"}

            </span>

          </div>


          <div className="sinopse-box">

            <h3>
              Sinopse
            </h3>

            <p>

              {filme.sinopse ||
                "Sinopse não disponível"}

            </p>

          </div>

        </div>

      </div>

    </main>

  </div>
);
}