import con from "./conection.js";


// ==========================
// SALVAR FILME
// ==========================

export async function salvarFilme(filme) {

  const comando = `
    INSERT INTO tb_filme
    (
      nm_filme,
      ds_sinopse,
      vl_avaliacao,
      dt_lancamento,
      bt_disponivel,
      categoria,
      duracao,
      classificacao,
      img
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [resposta] =
    await con.query(
      comando,
      [
        filme.nome,
        filme.sinopse,
        filme.avaliacao,
        filme.lancamento,
        filme.disponivel,
        filme.categoria,
        filme.duracao,
        filme.classificacao,
        filme.imagem
      ]
    );

  return resposta.insertId;
}



// ==========================
// CONSULTAR FILMES
// ==========================

export async function consultarFilmes(nome) {

  let comando = `
    SELECT
      id_filme id,
      nm_filme nome,
      ds_sinopse sinopse,
      vl_avaliacao avaliacao,
      dt_lancamento lancamento,
      bt_disponivel disponivel,
      categoria categoria,
      duracao duracao,
      classificacao classificacao,
      img imagem
    FROM tb_filme
  `;

  const params = [];

  if (nome) {

    comando += `
      WHERE nm_filme LIKE ?
    `;

    params.push(`%${nome}%`);
  }

  const [resposta] =
    await con.query(
      comando,
      params
    );

  return resposta;
}



// ==========================
// CONSULTAR FILME POR ID
// ==========================

export async function consultarFilmePorId(id) {

  const comando = `
    SELECT
      id_filme id,
      nm_filme nome,
      ds_sinopse sinopse,
      vl_avaliacao avaliacao,
      dt_lancamento lancamento,
      bt_disponivel disponivel,
      categoria categoria,
      duracao duracao,
      classificacao classificacao,
      img imagem
    FROM tb_filme
    WHERE id_filme = ?
  `;

  const [resposta] =
    await con.query(
      comando,
      [id]
    );

  return resposta[0];
}



// ==========================
// ALTERAR FILME
// ==========================

export async function alterarFilme(
  filme,
  id
) {

  const comando = `
    UPDATE tb_filme
    SET
      nm_filme = ?,
      ds_sinopse = ?,
      vl_avaliacao = ?,
      dt_lancamento = ?,
      bt_disponivel = ?,
      categoria = ?,
      duracao = ?,
      classificacao = ?,
      img = ?
    WHERE id_filme = ?
  `;

  const [resposta] =
    await con.query(
      comando,
      [
        filme.nome,
        filme.sinopse,
        filme.avaliacao,
        filme.lancamento,
        filme.disponivel,
        filme.categoria,
        filme.duracao,
        filme.classificacao,
        filme.imagem,
        id
      ]
    );

  return resposta.affectedRows;
}



// ==========================
// DELETAR FILME
// ==========================

export async function deletarFilme(id) {

  const comando = `
    DELETE FROM tb_filme
    WHERE id_filme = ?
  `;

  const [resposta] =
    await con.query(
      comando,
      [id]
    );

  return resposta.affectedRows;
}