import { consultarFilmePorId } from "../../repository/filmeRepository.js";

export default async function consultarFilmeIdService(id) {

  const filme = await consultarFilmePorId(id);

  if (!filme) {
    throw new Error("Filme não encontrado");
  }

  return filme;
}