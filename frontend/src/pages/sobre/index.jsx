
import "./index.scss";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const equipe = [
  {
    nome: "Guilherme Vidal",
    cargo: "Fundador",
    foto: "/assets/images/sasuke.gif",
  },
  {
    nome: "Guilherme Vidal",
    cargo: "Desenvolvedor Back-End",
    foto: "/assets/images/sasuke.gif",
    
  },
  {
    nome: "Guilherme Vidal",
    cargo: "Desenvolvedor Front-End",
    foto: "/assets/images/sasuke.gif",
    
  },
];

export default function SobreNos(){
  return (
    <div className="sobre-nos">
        <Header/>
      {/* Banner */}
      <section className="banner">
        <h1>Sobre Nós</h1>
        <p>Conheça nossa história, missão e equipe apaixonada por criar soluções incríveis.</p>
      </section>

      {/* Nossa História */}
      <section className="historia">
        <h2>Minha História</h2>
        <p>
          Informatica sempre foi minha paixão, seja programação ou redes a tecnologia muda e facilita a vida das pessoas
          me esforcei e dediquei para me profissionalizar nessa área que gosto tanto
        </p>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="mvv">
        <div className="card">
          <h3>Missão</h3>
          <p>Criar soluções digitais inovadoras que facilitem a vida das pessoas e gerem impacto positivo.</p>
        </div>
        <div className="card">
          <h3>Visão</h3>
          <p>Ser referência em tecnologia e inovação, construindo projetos que inspirem confiança e qualidade.</p>
        </div>
        <div className="card">
          <h3>Valores</h3>
          <p>Ética, transparência, criatividade, colaboração e compromisso com resultados.</p>
        </div>
      </section>

      {/* Equipe */}
      <section className="equipe">
        <h2>Minha Equipe</h2>
        <p>Talento e diciplina.</p>
        <div className="cards-equipe">
          {equipe.map((membro) => (
            <div key={membro.nome} className="membro">
              <img src={membro.foto} alt={membro.nome} />
              <h3>{membro.nome}</h3>
              <p>{membro.cargo}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
};


