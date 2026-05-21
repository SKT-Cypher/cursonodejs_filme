import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children
}) {

  const adminLogado =
    localStorage.getItem(
      "admin-logado"
    );

  if (!adminLogado) {

    return <Navigate to="/" />;
  }

  return children;
}