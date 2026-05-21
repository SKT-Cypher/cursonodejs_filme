import React, { useEffect, useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import "./index.scss";

import Header from "../../components/Header";

import Footer from "../../components/Footer";


export default function Movies() {

  const navigate = useNavigate();

  const [filmes, setFilmes] =
    useState([]);

  const [busca, setBusca] =
    useState("");


  const URL_API =
    "http://localhost:5000";


  const IMAGEM_DEFAULT =
    "https://via.placeholder.com/300x450?text=Sem+Imagem";


  // =========================
  // BUSCAR FILMES
  // =========================

  useEffect(() => {

    async function fetchFilmes() {

      try {

        const response = await fetch(
          `${URL_API}/filme`
        );

        const data =
          await response.json();

        console.log(data);

        setFilmes(data);

      }

      catch (err) {

        console.error(
          "Erro ao buscar filmes:",
          err
        );
      }
    }

    fetchFilmes();

  }, []);


  // =========================
  // FILTRO PESQUISA
  // =========================

  const filmesFiltrados =
    filmes.filter((filme) =>

      filme.nome
        ?.toLowerCase()
        .includes(
          busca.toLowerCase()
        )
    );


  return (

    <div className="movies-page">

      <Header />


      {/* ========================= */}
      {/* CAMPO PESQUISA */}
      {/* ========================= */}

      <section className="filtros">

        <input
          type="text"
          placeholder="Buscar filme..."
          value={busca}
          onChange={(e) =>
            setBusca(
              e.target.value
            )
          }
        />

      </section>



      {/* ========================= */}
      {/* CATÁLOGO */}
      {/* ========================= */}

      <section className="catalogo">

        {filmesFiltrados.length > 0 ? (

          filmesFiltrados.map((filme) => {

            const urlImagem =
              filme.imagem

                ? `${URL_API}/storage/capa/${filme.imagem}`

                : IMAGEM_DEFAULT;


            return (

              <div
                key={filme.id}

                className="card-filme"

                onClick={() =>
                  navigate(
                    `/movie/${filme.id}`
                  )
                }
              >

                <img
                  src={urlImagem}
                  alt={filme.nome}
                />

                <h3>
                  {filme.nome}
                </h3>

              </div>
            );
          })

        ) : (

          <p className="sem-filmes">

            Nenhum filme encontrado.

          </p>
        )}

      </section>

      <Footer />

    </div>
  );
}