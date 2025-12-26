import React, { useEffect, useState } from "react";
import "./index.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Movies() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");

  const URL_API = "http://localhost:5001";
  const IMAGEM_DEFAULT = "https://via.placeholder.com/300x450?text=Sem+Imagem";

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await fetch(`${URL_API}/filme`);
        const data = await response.json();
        setFilmes(data);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    }
    fetchFilmes();
  }, []);

  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="movies-page">
      <Header />

      {/* Campo de busca */}
      <section className="filtros">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {/* Catálogo de filmes */}
      <section className="catalogo">
        {filmesFiltrados.length > 0 ? (
          filmesFiltrados.map((filme) => {
            // 🔹 Corrige a URL da imagem igual no DetalhesFilme
            const urlImagem = filme.img
              ? `${URL_API}/${filme.img.replaceAll("\\", "/")}`
              : IMAGEM_DEFAULT;

            return (
              <div key={filme.id} className="card-filme">
                <img src={urlImagem} alt={filme.nome} />
                <h3>{filme.nome}</h3>
              </div>
            );
          })
        ) : (
          <p className="sem-filmes">Nenhum filme encontrado.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
