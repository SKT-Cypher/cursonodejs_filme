import './index.scss'

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const filmesMock = [
  { id: 1, titulo: "Fall for Me", capa: "assets/images/hot.jpeg" },
  { id: 2, titulo: "Man on Fire", capa: "assets/images/hot.jpeg" },
  { id: 3, titulo: "Happy Gilmore 2", capa: "assets/images/hot.jpeg" },
  { id: 4, titulo: "Havoc", capa: "assets/images/hot.jpeg" },
  { id: 5, titulo: "Straw", capa: "assets/images/hot.jpeg" },
  { id: 6, titulo: "Outro Filme", capa: "assets/images/hot.jpeg" },
];

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const nextSlide = () => {
    if (startIndex + itemsPerPage < filmesMock.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="carousel">
      <h2 className="carousel__title">Confira os filmes em destaque</h2>

      <div className="carousel__container">
        {startIndex > 0 && (
          <button onClick={prevSlide} className="carousel__btn left">
            <ChevronLeft size={30} />
          </button>
        )}

        <div className="carousel__items">
          {filmesMock.slice(startIndex, startIndex + itemsPerPage).map((filme) => (
            <div key={filme.id} className="carousel__item">
              <img src={filme.capa} alt={filme.titulo} />
              <p>{filme.titulo}</p>
            </div>
          ))}
        </div>

        {startIndex + itemsPerPage < filmesMock.length && (
          <button onClick={nextSlide} className="carousel__btn right">
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
}
