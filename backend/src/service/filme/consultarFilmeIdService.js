import { consultarFilmesId } from "../../repository/filmeRepository.js";
import { validarFilmeUnico } from "../../validation/filme/filmeValidation.js";



export default async function consultarFilmesIdService(id){
    let registros = await consultarFilmesId(id);
    
    validarFilmeUnico(registros)
    let filme = registros[0];
    return filme;

}