import { salvarFilme , consultarFilmesNome } from "../../repository/filmeRepository.js";
import {validarNovoFilme , validarFilmeIgual} from "../../validation/filme/filmeValidation.js";


export default async function salvarFilmeService(filmeObj){
    validarNovoFilme(filmeObj);

    let registros = await consultarFilmesNome(filmeObj.nome);
    validarFilmeIgual(registros);
    

    let id = await salvarFilme(filmeObj);
    return id;

}