import React, {
  useState,
  useEffect
} from "react";

import Sidebar from "../../../components/SideBar";

import api from "../../../api";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  FaUserShield
} from "react-icons/fa";

import "./index.scss";

export default function CadastrarAdmin() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const API_URL =
    "http://localhost:5000/admin";


  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [cpf, setCpf] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [sucesso, setSucesso] =
    useState(false);


  // =========================
  // CARREGAR ADMIN
  // =========================

  useEffect(() => {

    if (id) {

      carregarAdmin();
    }

  }, [id]);


  async function carregarAdmin() {

    try {

      const response =
        await api.get(API_URL);

      const admin =
        response.data.find(
          (a) =>
            a.id == id
        );

      if (!admin) {

        navigate(
          "/consultarAdmin"
        );

        return;
      }

      setNome(admin.nome);

      setEmail(admin.email);

      setSenha(admin.senha);

      setCpf(admin.cpf);
    }

    catch (err) {

      console.log(err);
    }
  }


  // =========================
  // SALVAR
  // =========================

  async function salvarAdmin(e) {

    e.preventDefault();

    setErro("");


    try {

      const adminObj = {

        nome,
        email,
        senha,
        cpf
      };


      if (id) {

        await api.put(

          `${API_URL}/${id}`,

          adminObj
        );
      }

      else {

        await api.post(
          API_URL,
          adminObj
        );
      }


      setSucesso(true);


      setTimeout(() => {

        navigate(
          "/consultarAdm"
        );

      }, 1800);
    }

    catch (err) {

      console.log(err);

      setErro(

        err.response?.data?.erro ||

        "Erro ao salvar admin"
      );
    }
  }


  return (

    <div className="container-a">

      <Sidebar />


      <div className="main">

        <div className="form-container">


          <div className="topo">

            <FaUserShield />

            <h1>

              {id

                ? "Editar Admin"

                : "Cadastrar Admin"}

            </h1>

          </div>



          {erro && (

            <div className="erro">

              {erro}

            </div>

          )}



          {sucesso && (

            <div className="sucesso">

              {id

                ? "Admin atualizado com sucesso!"

                : "Admin cadastrado com sucesso!"}

            </div>

          )}



          <form onSubmit={salvarAdmin}>


            <div className="form-group">

              <label>
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) =>
                  setNome(
                    e.target.value
                  )
                }
                placeholder="Digite o nome"
              />

            </div>



            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Digite o email"
              />

            </div>



            <div className="form-group">

              <label>
                Senha
              </label>

              <input
                type="text"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                placeholder="Digite a senha"
              />

            </div>



            <div className="form-group">

              <label>
                CPF
              </label>

              <input
                type="text"
                value={cpf}
                onChange={(e) =>
                  setCpf(
                    e.target.value
                  )
                }
                placeholder="Digite o CPF"
              />

            </div>



            <button
              type="submit"
            >

              {id

                ? "Salvar Alterações"

                : "Cadastrar Admin"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}