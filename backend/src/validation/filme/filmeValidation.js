export function validarCamposObrigatoriosFilme(
  filmeObj
) {

  // =========================
  // NOME
  // =========================

  if (
    !filmeObj.nome ||
    filmeObj.nome.trim() == ""
  )
    throw new Error(
      "Nome do Filme obrigatório"
    );


  // =========================
  // SINOPSE
  // =========================

  if (
    !filmeObj.sinopse ||
    filmeObj.sinopse.trim() == ""
  )
    throw new Error(
      "Sinopse do Filme obrigatória"
    );


  // =========================
  // AVALIAÇÃO
  // =========================

  if (
    filmeObj.avaliacao == undefined ||
    filmeObj.avaliacao == ""
  )
    throw new Error(
      "Avaliação do Filme obrigatória"
    );


  if (
    isNaN(filmeObj.avaliacao)
  )
    throw new Error(
      "Avaliação do Filme inválida"
    );


  // =========================
  // LANÇAMENTO
  // =========================

  if (
    !filmeObj.lancamento
  )
    throw new Error(
      "Lançamento do Filme obrigatório"
    );


  // =========================
  // DISPONIBILIDADE
  // =========================

  if (
    filmeObj.disponivel == undefined
  )
    throw new Error(
      "Disponibilidade do Filme obrigatória"
    );


  // =========================
  // CATEGORIA
  // =========================

  if (
    !filmeObj.categoria ||
    filmeObj.categoria.trim() == ""
  )
    throw new Error(
      "Categoria do Filme obrigatória"
    );


  // =========================
  // DURAÇÃO
  // =========================

  if (
    !filmeObj.duracao ||
    filmeObj.duracao.trim() == ""
  )
    throw new Error(
      "Duração do Filme obrigatória"
    );


  // =========================
  // CLASSIFICAÇÃO
  // =========================

  if (
    !filmeObj.classificacao ||
    filmeObj.classificacao.trim() == ""
  )
    throw new Error(
      "Classificação do Filme obrigatória"
    );
}



// =========================
// FILME NÃO ENCONTRADO
// =========================

export function validarFilmeUnico(
  registros
) {

  if (
    registros.length == 0
  )
    throw new Error(
      "Filme não encontrado"
    );
}



// =========================
// FILME DUPLICADO
// =========================

export function validarFilmeIgual(
  registros
) {

  if (
    registros.length > 0
  )
    throw new Error(
      "Já existe filme cadastrado com esse nome!"
    );
}