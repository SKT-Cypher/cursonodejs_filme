import "./index.scss";

import { useState, useEffect } from "react";

import axios from "axios";

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useNavigate }
from "react-router-dom";


export default function Carousel() {

  const navigate = useNavigate();

  const [filmes, setFilmes] =
    useState([]);

  const [startIndex, setStartIndex] =
    useState(0);

  const itemsPerPage = 5;


  useEffect(() => {

    buscarFilmes();

  }, []);


  async function buscarFilmes() {

    try {

      const response = await axios.get(
        "http://localhost:5000/filme"
      );

      // MOSTRA NO MÁXIMO 10 FILMES

      setFilmes(
        response.data.slice(0, 10)
      );

    }

    catch (erro) {

      console.log(
        "Erro ao buscar filmes:",
        erro
      );
    }
  }


  const nextSlide = () => {

    if (
      startIndex + itemsPerPage <
      filmes.length
    ) {

      setStartIndex(
        startIndex + itemsPerPage
      );
    }
  };


  const prevSlide = () => {

    if (
      startIndex - itemsPerPage >= 0
    ) {

      setStartIndex(
        startIndex - itemsPerPage
      );
    }
  };


  return (

    <div className="carousel">

      <h2 className="carousel__title">

        Confira os filmes em destaque

      </h2>


      <div className="carousel__container">


        {startIndex > 0 && (

          <button
            onClick={prevSlide}
            className="carousel__btn left"
          >

            <ChevronLeft size={30} />

          </button>

        )}


        <div className="carousel__items">

          {filmes
            .slice(
              startIndex,
              startIndex + itemsPerPage
            )
            .map((filme) => {

              const urlImagem =
                filme.imagem

                  ? `http://localhost:5000/storage/capa/${filme.imagem}`

                  : "/assets/images/hot.jpeg";


              return (

                <div
                  key={filme.id}
                  className="carousel__item"

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

                  <p>
                    {filme.nome}
                  </p>

                </div>
              );
            })}

        </div>


        {startIndex + itemsPerPage <
          filmes.length && (

          <button
            onClick={nextSlide}
            className="carousel__btn right"
          >

            <ChevronRight size={30} />

          </button>

        )}

      </div>

    </div>
  );
}