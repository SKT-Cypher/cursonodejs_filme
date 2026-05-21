import "./index.scss";

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import Header from "../../components/Header";

import Footer from "../../components/Footer";


export default function MovieDetalhes() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [filme, setFilme] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


 useEffect(() => {

  async function buscarFilme() {

    try {

      const response = await axios.get(
        `http://localhost:5000/filme/${id}`
      );

      setFilme(response.data);

    }

    catch (erro) {

      console.log(erro);

      navigate("/");
    }

    finally {

      setLoading(false);
    }
  }

  buscarFilme();

}, [id, navigate]);


 

  if (loading) {

    return (

      <div className="movie-loading">

        Carregando filme...

      </div>
    );
  }


  if (!filme) {

    return (

      <div className="movie-loading">

        Filme não encontrado.

      </div>
    );
  }


  const imagemUrl =
    filme.imagem

      ? `http://localhost:5000/storage/capa/${filme.imagem}`

      : "/assets/images/hot.jpeg";


  const dataLancamento =
    filme.lancamento

      ? new Date(
          filme.lancamento
        ).toLocaleDateString("pt-BR")

      : "N/A";


  return (

    <div className="movie-details-page">

      <Header />


      {/* BANNER */}

      <section
        className="movie-banner"

        style={{
          backgroundImage:
            `url(${imagemUrl})`
        }}
      >

        <div className="movie-overlay">

          <div className="movie-content">


            {/* CAPA */}

            <div className="movie-poster">

              <img
                src={imagemUrl}
                alt={filme.nome}
              />

            </div>



            {/* INFOS */}

            <div className="movie-info">

              <h1>
                {filme.nome}
              </h1>


              <div className="movie-meta">

                <span>
                  ⭐ {filme.avaliacao}/10
                </span>

                <span>
                  📅 {dataLancamento}
                </span>

                <span>

                  {filme.disponivel
                    ? "🟢 Disponível"
                    : "🔴 Indisponível"}

                </span>

              </div>


              <h3>
                Sinopse
              </h3>

              <p>
                {filme.sinopse}
              </p>


              <button>

              <a href="/movies">Voltar ao catálogo</a> 
              </button>

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}