import { consultarFilmesId } from "../../repository/filmeRepository.js";

export default async function consultarFilmesService(id) {
  const filme = await consultarFilmesId(id);
  if (!filme) throw new Error("Filme não encontrado");
  return filme;
}
