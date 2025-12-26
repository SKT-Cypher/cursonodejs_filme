import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css';
import Home from './pages/home';
import Movies from './pages/movies';
import SobreNos from './pages/sobre';
import LoginAdmin from './pages/admin/adminLogin';
import CadastrarFilme from './pages/admin/CadastrarFilme';
import ConsultarFilme from './pages/admin/ConsultarFilme';
import DetalhesFilme from './pages/admin/DetalheFilme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/movies' element={<Movies/>} />
              <Route path='/sobre' element={<SobreNos/>} />
              <Route path='/admin' element={<LoginAdmin/>} />
              <Route path='/cadastrar' element={<CadastrarFilme/>} />
              <Route path="/editar/:id" element={<CadastrarFilme />} />

              <Route path='/consultar' element={<ConsultarFilme/>} />
         

              <Route path="/filme/:id" element={<DetalhesFilme />} />  {/* aqui está singular */}


          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);


