import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const adminEmail = "admin@v";
    const adminSenha = "123";

    if (email === adminEmail && senha === adminSenha) {
      setErro("");
      console.log("Login realizado com sucesso!");
      navigate("/cadastrar"); // 🔗 redireciona para sua página
    } else {
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div className="login-admin-page">
      <div className="login-card">
        <h2>Login Administrador</h2>
        {erro && <p className="erro">{erro}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
