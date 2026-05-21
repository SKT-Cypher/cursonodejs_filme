export function validarCamposObrigatoriosFilme(filmeObj) {

    if (!filmeObj.nome || filmeObj.nome.trim() == "")
        throw new Error("Nome do Filme obrigatório");

    if (!filmeObj.sinopse || filmeObj.sinopse.trim() == "")
        throw new Error("Sinopse do Filme obrigatório");

    if (filmeObj.avaliacao == undefined || filmeObj.avaliacao == "")
        throw new Error("Avaliação do Filme obrigatória");

    if (isNaN(filmeObj.avaliacao))
        throw new Error("Avaliação do Filme inválida");

    if (!filmeObj.lancamento)
        throw new Error("Lançamento do Filme obrigatório");

    if (filmeObj.disponivel == undefined)
        throw new Error("Disponibilidade do Filme obrigatória");
}


export function validarFilmeUnico(registros) {

    if (registros.length == 0)
        throw new Error("Filme não encontrado");
}


export function validarFilmeIgual(registros) {

    if (registros.length > 0)
        throw new Error("Já existe filme cadastrado com esse nome!");
}