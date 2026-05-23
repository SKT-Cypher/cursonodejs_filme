import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Header from "../../../components/Header";

import "./index.scss";

export default function LoginAdmin() {

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);

  const navigate =
    useNavigate();


  async function handleLogin(e) {

    e.preventDefault();

    setErro("");


    // =========================
    // VALIDAÇÃO
    // =========================

    if (!email || !senha) {

      setErro(
        "Preencha todos os campos."
      );

      return;
    }


    try {

      setCarregando(true);


      // =========================
      // LOGIN API
      // =========================

      const response =
        await axios.post(

          "http://localhost:5000/admin/login",

          {
            email,
            senha
          }
        );


      // =========================
      // DADOS RETORNO
      // =========================

      const dados =
        response.data;


      // =========================
      // TOKEN JWT
      // =========================

      localStorage.setItem(

        "TOKEN",

        dados.token
      );


      // =========================
      // LOGIN
      // =========================

      localStorage.setItem(

        "admin-logado",

        "true"
      );


      // =========================
      // DADOS ADMIN
      // =========================

      localStorage.setItem(

        "admin-dados",

        JSON.stringify(
          dados.admin
        )
      );


      // =========================
      // REDIRECIONA
      // =========================

      navigate("/consultar");

    }

    catch (err) {

      console.log(err);

      setErro(

        err.response?.data?.erro ||

        "Erro ao realizar login"
      );
    }

    finally {

      setCarregando(false);
    }
  }


  return (

    <div className="login-admin-page">

      <Header />

      <div className="login-container">

        <div className="login-card">


          {/* TOPO */}

          <div className="topo">

            <h1>
              Painel Administrativo
            </h1>

          </div>


          {/* ERRO */}

          {erro && (

            <div className="erro">

              {erro}

            </div>
          )}


          {/* FORM */}

          <form onSubmit={handleLogin}>


            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>



            {/* SENHA */}

            <div className="input-group">

              <label>
                Senha
              </label>

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
              />

            </div>



            {/* BOTÃO */}

            <button
              type="submit"
              disabled={carregando}
            >

              {carregando

                ? "Entrando..."

                : "Entrar"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}