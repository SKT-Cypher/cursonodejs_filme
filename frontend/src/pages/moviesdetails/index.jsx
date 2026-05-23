import "./index.scss";

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import Header from "../../components/Header";

import Footer from "../../components/Footer";

import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaFilm,
  FaArrowLeft
} from "react-icons/fa";


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


  function getClassificacaoClass() {

    const cls =
      filme.classificacao?.toLowerCase();

    if (cls?.includes("livre"))
      return "livre";

    if (cls?.includes("10"))
      return "dez";

    if (cls?.includes("12"))
      return "doze";

    if (cls?.includes("14"))
      return "quatorze";

    if (cls?.includes("16"))
      return "dezesseis";

    return "dezoito";
  }


  function getNotaClass() {

    const nota =
      Number(filme.avaliacao);

    if (nota >= 7)
      return "nota-boa";

    if (nota >= 5)
      return "nota-media";

    return "nota-ruim";
  }


  return (

    <div className="movie-details-page">

      <Header />


      <section
        className="movie-banner"

        style={{
          backgroundImage:
            `url(${imagemUrl})`
        }}
      >

        <div className="movie-overlay">

          <div className="movie-content">


            {/* POSTER */}

            <div className="movie-poster">

              <img
                src={imagemUrl}
                alt={filme.nome}
              />

            </div>



            {/* INFOS */}

            <div className="movie-info">


              <div className="movie-header">

                <h1>{filme.nome}</h1>

              </div>



              {/* CARDS */}

              <div className="movie-cards">


                <div className={`info-card avaliacao-card ${getNotaClass()}`}>

                  <FaStar />

                  <div>

                    <span>Avaliação</span>

                    <strong>
                      {filme.avaliacao}/10
                    </strong>

                  </div>

                </div>



                <div className="info-card">

                  <FaCalendarAlt />

                  <div>

                    <span>Lançamento</span>

                    <strong>
                      {dataLancamento}
                    </strong>

                  </div>

                </div>



                <div className="info-card">

                  <FaClock />

                  <div>

                    <span>Duração</span>

                    <strong>
                      {filme.duracao} min
                    </strong>

                  </div>

                </div>



                <div className="info-card">

                  <FaFilm />

                  <div>

                    <span>Categoria</span>

                    <strong>
                      {filme.categoria}
                    </strong>

                  </div>

                </div>

              </div>



              {/* BADGES */}

             <div className="movie-badges">

  <span className={`classificacao ${getClassificacaoClass()}`}>

    {filme.classificacao}

  </span>


  <span
    className={
      filme.disponivel
        ? "status disponivel"
        : "status indisponivel"
    }
  >

    {
      filme.disponivel
        ? "🟢 Disponível Agora"
        : "🔴 Indisponível"
    }

  </span>

</div>



              {/* SINOPSE */}

              <div className="sinopse-box">

                <h3>Sinopse</h3>

                <p>
                  {filme.sinopse}
                </p>

              </div>



              {/* BOTÃO */}

              <button
                onClick={() =>
                  navigate("/movies")
                }
              >

                <FaArrowLeft />

                Voltar ao Catálogo

              </button>

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}