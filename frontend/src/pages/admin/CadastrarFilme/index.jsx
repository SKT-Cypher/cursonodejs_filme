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

import "./index.scss";

export default function CadastrarFilme() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [titulo, setTitulo] =
    useState("");

  const [sinopse, setSinopse] =
    useState("");

  const [lancamento, setLancamento] =
    useState("");

  const [avaliacao, setAvaliacao] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [duracao, setDuracao] =
    useState("");

  const [classificacao, setClassificacao] =
    useState("");

  const [disponivel, setDisponivel] =
    useState(false);

  const [imagem, setImagem] =
    useState(null);

  const [imagemPreview, setImagemPreview] =
    useState(null);

  const [popup, setPopup] =
    useState(false);

  const [mensagemPopup, setMensagemPopup] =
    useState("");

  const API_URL =
    "http://localhost:5000/filme";


  // =========================
  // CARREGAR FILME
  // =========================

  useEffect(() => {

    if (id) {

      carregarFilme();
    }

  }, [id]);


  async function carregarFilme() {

    try {

      const resp =
        await api.get(
          `${API_URL}/${id}`
        );

      const f = resp.data;

      setTitulo(
        f.nome || ""
      );

      setSinopse(
        f.sinopse || ""
      );

      setLancamento(
        f.lancamento
          ? new Date(f.lancamento)
              .toISOString()
              .split("T")[0]
          : ""
      );

      setAvaliacao(
        f.avaliacao || ""
      );

      setCategoria(
        f.categoria || ""
      );

      setDuracao(
        f.duracao || ""
      );

      setClassificacao(
        f.classificacao || ""
      );

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


  // =========================
  // SALVAR FILME
  // =========================

  async function salvarFilme(e) {

    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "nome",
        titulo
      );

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
        "categoria",
        categoria
      );

      formData.append(
        "duracao",
        duracao
      );

      formData.append(
        "classificacao",
        classificacao
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


      // EDITAR

      if (id) {

        await api.put(
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


      // CADASTRAR

      else {

        await api.post(
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

      alert(
        erro.response?.data?.erro ||
        "Erro ao salvar filme"
      );
    }
  }


  return (

    <div className="container-b">

      <Sidebar />

      <div className="main">

        <div className="form-container">


          {/* PREVIEW */}

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



          {/* FORM */}

          <div className="form-area">

            <h2>

              {id
                ? "Editar Filme"
                : "Cadastrar Filme"}

            </h2>


            <form onSubmit={salvarFilme}>


              {/* TITULO */}

              <div className="form-group">

                <label>
                  Título
                </label>

                <input
                  type="text"
                  maxLength={50}
                  value={titulo}
                  onChange={(e) =>
                    setTitulo(
                      e.target.value
                    )
                  }
                  required
                />

              </div>



              {/* SINOPSE */}

              <div className="form-group">

                <label>
                  Sinopse
                </label>

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



              {/* DATA */}

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



              {/* LINHA 1 */}

              <div className="linha-dupla">

                <div className="form-group">

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


                <div className="form-group">

                  <label>
                    Duração
                  </label>

                  <input
                    type="text"
                    placeholder="120 min"
                    value={duracao}
                    onChange={(e) =>
                      setDuracao(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>



              {/* LINHA 2 */}

              <div className="linha-dupla">

                <div className="form-group">

                  <label>
                    Categoria
                  </label>

                  <select
                    value={categoria}
                    onChange={(e) =>
                      setCategoria(
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Selecione
                    </option>

                    <option value="Ação">
                      Ação
                    </option>

                    <option value="Terror">
                      Terror
                    </option>

                    <option value="Drama">
                      Drama
                    </option>

                    <option value="Comédia">
                      Comédia
                    </option>

                    <option value="Ficção">
                      Ficção
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Classificação
                  </label>

                  <select
                    value={classificacao}
                    onChange={(e) =>
                      setClassificacao(
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Selecione
                    </option>

                    <option value="Livre">
                      Livre
                    </option>

                    <option value="10">
                      10 anos
                    </option>

                    <option value="12">
                      12 anos
                    </option>

                    <option value="14">
                      14 anos
                    </option>

                    <option value="16">
                      16 anos
                    </option>

                    <option value="18">
                      18 anos
                    </option>

                  </select>

                </div>

              </div>



              {/* DISPONIVEL */}

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



              {/* IMAGEM */}

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



      {/* POPUP */}

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