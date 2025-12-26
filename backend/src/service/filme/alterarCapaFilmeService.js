import { alterarCapaFilme } from "../../repository/filmeRepository.js";

export default async function alterarCapaFilmeService(id, caminho) {
  const linhasAfetadas = await alterarCapaFilme(id, caminho);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum filme foi alterado");
  }
}
