import { consultarFilmes } from "../../repository/filmeRepository.js";

export default async function consultarFilmesService(nome) {
  const registros = await consultarFilmes(nome);

  return registros;
}