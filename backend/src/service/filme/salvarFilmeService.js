import { salvarFilme , consultarFilmesNome } from "../../repository/filmeRepository.js";
import {validarCamposObrigatoriosFilme , validarFilmeIgual} from "../../validation/filme/filmeValidation.js";


export default async function salvarFilmeService(filmeObj){
    validarCamposObrigatoriosFilme(filmeObj);

    let registros = await consultarFilmesNome(filmeObj.nome);
    validarFilmeIgual(registros);
    

    let id = await salvarFilme(filmeObj);
    return id;

}