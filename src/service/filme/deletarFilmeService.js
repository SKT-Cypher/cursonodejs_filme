import { deletarFilme } from "../../repository/filmeRepository.js";


export default async function deletarFilmeService(id){
 let linhasAfetadas = await deletarFilme(id);

 if(linhasAfetadas == 0)
    throw new Error('Nenhum filme foi removido.')
}