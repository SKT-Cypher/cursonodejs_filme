import { deletarFilme } from "../../repository/filmeRepository.js";

export default async function deletarFilmeService(id) {
  const linhasAfetadas = await deletarFilme(id);
  if (linhasAfetadas === 0) throw new Error("Nenhum filme encontrado para deletar");
}
