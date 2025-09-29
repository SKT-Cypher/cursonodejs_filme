import alterarFilme from "../../repository/filmeRepository.js";
import { validarCamposObrigatoriosFilme } from "../../validation/filme/filmeValidation.js";


export default async function alterarFilmeService(filmeObj, id){

    validarCamposObrigatoriosFilme(filmeObj)

   let linhasAfetadas = await alterarFilme(filmeObj, id);
   if(linhasAfetadas == 0)
    throw new Error ('Nenhum filme alterado.')


}