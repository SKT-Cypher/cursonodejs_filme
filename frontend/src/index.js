import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './index.css';

import Home from './pages/home';
import MovieDetalhes from './pages/moviesdetails';

import Movies from './pages/movies';

import SobreNos from './pages/sobre';

import LoginAdmin from './pages/admin/adminLogin';

import CadastrarFilme from './pages/admin/CadastrarFilme';

import ConsultarFilme from './pages/admin/ConsultarFilme';

import DetalhesFilme from './pages/admin/DetalheFilme';

import ProtectedRoute from './Routes/ProtectedRoute';



const root = ReactDOM.createRoot(
  document.getElementById('root')
);



root.render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>


        {/* PÚBLICAS */}

        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/movie/:id'
          element={<MovieDetalhes />}
        />

        <Route
          path='/movies'
          element={<Movies />}
        />

        <Route
          path='/sobre'
          element={<SobreNos />}
        />

        <Route
          path='/admin'
          element={<LoginAdmin />}
        />


        {/* PROTEGIDAS */}

        <Route
          path='/cadastrar'
          element={
            <ProtectedRoute>
              <CadastrarFilme />
            </ProtectedRoute>
          }
        />


        <Route
          path="/editar/:id"
          element={
            <ProtectedRoute>
              <CadastrarFilme />
            </ProtectedRoute>
          }
        />


        <Route
          path='/consultar'
          element={
            <ProtectedRoute>
              <ConsultarFilme />
            </ProtectedRoute>
          }
        />


        <Route
          path="/filme/:id"
          element={
            <ProtectedRoute>
              <DetalhesFilme />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);