import { consultarFilmesNome } from "../../repository/filmeRepository.js";

export default async function consultarFilmesService(nome){
    // Se não houver nome, envia vazio
    nome = nome || '';
    let registros = await consultarFilmesNome(nome);
    return registros;
}
