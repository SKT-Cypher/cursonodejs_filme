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
  const [imagemPreview, setImagemPreview] = useState(null);

  const API_URL = "http://localhost:5001/filme";

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then((resp) => {
        const f = resp.data;
        setTitulo(f.nome || "");
        setSinopse(f.sinopse || "");
        setLancamento(f.dt_lancamento ? f.dt_lancamento.split("T")[0] : "");
        setAvaliacao(f.vl_avaliacao || "");
        setDisponivel(f.bt_disponivel || false);

        if (f.img_filme) {
          setImagemPreview(`http://localhost:5001/${f.img_filme.replace(/\\/g, "/")}`);
        }
      }).catch(err => console.error("Erro ao carregar filme:", err));
    }
  }, [id]);

  const salvarFilme = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", titulo);
      formData.append("sinopse", sinopse);
      formData.append("lancamento", lancamento);
      formData.append("avaliacao", avaliacao);
      formData.append("disponivel", disponivel);

      if (imagem) formData.append("imagem", imagem);

      if (id) {
        await axios.put(`${API_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Filme atualizado com sucesso!");
      } else {
        await axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Filme cadastrado com sucesso!");
      }

      navigate("/filme/consultar");
    } catch (erro) {
      console.error("Erro ao salvar filme:", erro);
      alert("Erro ao salvar filme.");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <div className="form-container">
          <h2>{id ? "Editar Filme" : "Cadastrar Filme"}</h2>
          <form onSubmit={salvarFilme}>
            <div className="form-group">
              <label>Título:</label>
              <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Sinopse:</label>
              <textarea value={sinopse} onChange={e => setSinopse(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Data de Lançamento:</label>
              <input type="date" value={lancamento} onChange={e => setLancamento(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Avaliação:</label>
              <input type="number" step="0.1" min="0" max="10" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} required />
            </div>
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" checked={disponivel} onChange={e => setDisponivel(e.target.checked)} /> Disponível
              </label>
            </div>
            <div className="form-group">
              <label>{id ? "Alterar Capa:" : "Imagem:"}</label>
              <input type="file" accept="image/*" onChange={e => {
                const file = e.target.files[0];
                setImagem(file);
                if(file) setImagemPreview(URL.createObjectURL(file));
              }} />
              {imagemPreview && <img src={imagemPreview} alt="Prévia" style={{width:"150px", marginTop:"10px", borderRadius:"8px"}} />}
            </div>
            <button type="submit" className="btn-salvar">{id ? "Salvar Alterações" : "Cadastrar Filme"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
