import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/SideBar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./index.scss";

export default function CadastrarFilme() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [lancamento, setLancamento] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [disponivel, setDisponivel] = useState(false);

  const [imagem, setImagem] = useState(null);

  const [imagemPreview, setImagemPreview] =
    useState(null);

  const [popup, setPopup] = useState(false);

  const [mensagemPopup, setMensagemPopup] =
    useState("");

  const API_URL =
    "http://localhost:5000/filme";


  useEffect(() => {

  if (id) {

    carregarFilme();
  }

}, [id]); // eslint-disable-line


  async function carregarFilme() {

    try {

      const resp = await axios.get(
        `${API_URL}/${id}`
      );

      const f = resp.data;

      setTitulo(f.nome || "");

      setSinopse(f.sinopse || "");

      setLancamento(
        f.lancamento
          ? new Date(f.lancamento)
              .toISOString()
              .split("T")[0]
          : ""
      );

      setAvaliacao(f.avaliacao || "");

      setDisponivel(
        f.disponivel === 1 ||
        f.disponivel === true
      );

      if (f.imagem) {

        setImagemPreview(
          `http://localhost:5000/storage/capa/${f.imagem}`
        );
      }

    }

    catch (err) {

      console.log(err);
    }
  }


  async function salvarFilme(e) {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("nome", titulo);

      formData.append(
        "sinopse",
        sinopse
      );

      formData.append(
        "lancamento",
        lancamento
      );

      formData.append(
        "avaliacao",
        Number(avaliacao)
      );

      formData.append(
        "disponivel",
        disponivel ? 1 : 0
      );

      if (imagem) {

        formData.append(
          "imagem",
          imagem
        );
      }


      if (id) {

        await axios.put(
          `${API_URL}/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        setMensagemPopup(
          "Filme atualizado com sucesso!"
        );

        setPopup(true);
      }

      else {

        await axios.post(
          API_URL,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        setMensagemPopup(
          "Filme cadastrado com sucesso!"
        );

        setPopup(true);
      }

    }

    catch (erro) {

      console.log(erro);

      alert("Erro ao salvar filme");
    }
  }


  return (

    <div className="container">

      <Sidebar />

      <div className="main">

        <div className="form-container">


          {/* LADO ESQUERDO */}

          <div className="preview-area">

            {imagemPreview ? (

              <img
                src={imagemPreview}
                alt="Capa"
              />

            ) : (

              <div className="sem-imagem">
                Sem Capa
              </div>

            )}

            <h1>
              {titulo || "Seu Filme"}
            </h1>

          </div>



          {/* LADO DIREITO */}

          <div className="form-area">

            <h2>

              {id
                ? "Editar Filme"
                : "Cadastrar Filme"}

            </h2>


            <form onSubmit={salvarFilme}>


              <div className="form-group">

                <label>Título</label>

                <input
                  type="text"
                  value={titulo}
                  maxLength={50}
                  onChange={(e) =>
                    setTitulo(
                      e.target.value
                    )
                  }
                  required
                />

              </div>



              <div className="form-group">

                <label>Sinopse</label>

                <textarea
                  value={sinopse}
                  onChange={(e) =>
                    setSinopse(
                      e.target.value
                    )
                  }
                  required
                />

              </div>



              <div className="form-group">

                <label>
                  Lançamento
                </label>

                <input
                  type="date"
                  value={lancamento}
                  onChange={(e) =>
                    setLancamento(
                      e.target.value
                    )
                  }
                  required
                />

              </div>



              <div className="linha-dupla">

                <div className="form-group avaliacao">

                  <label>
                    Avaliação
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={avaliacao}
                    onChange={(e) =>
                      setAvaliacao(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>



                <div className="form-group checkbox">

                  <label>
                    Disponível
                  </label>

                  <input
                    type="checkbox"
                    checked={disponivel}
                    onChange={(e) =>
                      setDisponivel(
                        e.target.checked
                      )
                    }
                  />

                </div>

              </div>



              <div className="form-group">

                <label>

                  {id
                    ? "Alterar Capa"
                    : "Imagem"}

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {

                    const file =
                      e.target.files[0];

                    setImagem(file);

                    if (file) {

                      setImagemPreview(
                        URL.createObjectURL(
                          file
                        )
                      );
                    }
                  }}
                />

              </div>



              <button
                type="submit"
                className="btn-salvar"
              >

                {id
                  ? "Salvar Alterações"
                  : "Cadastrar Filme"}

              </button>

            </form>

          </div>

        </div>

      </div>



      {popup && (

        <div className="popup-overlay">

          <div className="popup-sucesso">

            <div className="icone-sucesso">
              ✅
            </div>

            <h2>
              Sucesso!
            </h2>

            <p>
              {mensagemPopup}
            </p>

            <button
              onClick={() => {

                setPopup(false);

                navigate("/consultar");
              }}
            >

              OK

            </button>

          </div>

        </div>

      )}

    </div>
  );
}