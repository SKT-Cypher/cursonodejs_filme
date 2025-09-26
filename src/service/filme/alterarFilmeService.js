import alterarFilme from "../../repository/filmeRepository.js";


export default async function alterarFilmeService(filmeObj, id){
   let linhasAfetadas = await alterarFilme(filmeObj, id);
   if(linhasAfetadas == 0)
    throw new Error ('Nenhum filme alterado.')


}