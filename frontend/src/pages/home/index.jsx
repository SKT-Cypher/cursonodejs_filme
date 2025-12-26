import './index.scss';

import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="Home-page">
      <Header />

      {/* Banner */}
      <section className="banner">
        <img 
          src="/assets/images/banner.jpg"  
          alt="Banner principal do site"  
          className="imagem-banner"  
        />
        <div className="texto-banner">
          <h1>Bem-vindo ao CineFlix</h1>
          <p>Descubra os melhores filmes aqui</p>
        </div>
      </section>

      {/* Destaques / Carrossel */}
      <section className="destaques">
        <div className="filmes-carrossel">
          <Carousel />
        </div>
      </section>

      {/* Informações */}
      <section className="info">
        <h1>Como funciona?</h1>
        <p>
          Aqui você encontra um catálogo com todos os filmes registrados em nosso banco de dados. 
          Este site não é uma plataforma de streaming, mas sim um espaço dedicado a curiosidades 
          e informações sobre cada título. Navegue, consulte e descubra detalhes sobre os seus 
          filmes favoritos!
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}



