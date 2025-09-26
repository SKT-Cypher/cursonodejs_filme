

export  function validarNovoFilme(filmeObj){
    if(!filmeObj.nome)
        throw new Error ("Nome do Filme obrigatório");

    if(!filmeObj.sinopse)
        throw new Error ("Sinopse do Filme obrigatório");

    if(!filmeObj.avaliacao)
        throw new Error ("Avaliação do Filme obrigatório");

    if(!filmeObj.lancamento)
        throw new Error ("Lançamento do Filme obrigatório");

    if(filmeObj.disponivel == undefined)
        throw new Error ("Disponibilidade do Filme obrigatório");

    if(isNaN(filmeObj.avaliacao))
        throw new Error ("Avaliação do Filme inválida");


}

export function validarFilmeUnico(registros){
    if(registros.length == 0)
        throw new Error ("Filme não encontrado");
}

export function validarFilmeIgual(registros){
    if (registros.length > 0)
        throw new Error("Ja existe filme cadastrado com esse nome!")
}