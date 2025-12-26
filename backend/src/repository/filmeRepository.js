import con from "./conection.js";

// === SALVAR FILME ===
export async function salvarFilme(filme) {
  const comando = `
    INSERT INTO tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel, img)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const [resposta] = await con.query(comando, [
    filme.nome,
    filme.sinopse,
    filme.avaliacao,
    filme.lancamento,
    filme.disponivel,
    filme.imagem || null,
  ]);
  return resposta.insertId;
}

// === ALTERAR FILME ===
export async function alterarFilme(filme, id) {
  const comando = `
    UPDATE tb_filme
    SET nm_filme = ?, ds_sinopse = ?, vl_avaliacao = ?, dt_lancamento = ?, bt_disponivel = ?
    WHERE id_filme = ?;
  `;
  const [resposta] = await con.query(comando, [
    filme.nome,
    filme.sinopse,
    filme.avaliacao,
    filme.lancamento,
    filme.disponivel,
    id,
  ]);
  return resposta.affectedRows;
}

// === ALTERAR CAPA FILME ===
export async function alterarCapaFilme(id, caminho) {
  const comando = `
    UPDATE tb_filme
    SET img = ?
    WHERE id_filme = ?;
  `;
  const [resposta] = await con.query(comando, [caminho, id]);
  return resposta.affectedRows;
}

// === CONSULTAR FILME POR ID ===
export async function consultarFilmePorId(id) {
  const comando = `
    SELECT id_filme AS id, nm_filme AS nome, ds_sinopse AS sinopse,
           vl_avaliacao AS avaliacao, dt_lancamento AS lancamento,
           bt_disponivel AS disponivel, img AS imagem
    FROM tb_filme
    WHERE id_filme = ?;
  `;
  const [resposta] = await con.query(comando, [id]);
  return resposta[0] || null;
}

// === CONSULTAR TODOS OS FILMES (opcional filtro por nome) ===
export async function consultarFilmes(nome) {
  let comando = `
    SELECT id_filme AS id, nm_filme AS nome, ds_sinopse AS sinopse,
           vl_avaliacao AS avaliacao, dt_lancamento AS lancamento,
           bt_disponivel AS disponivel, img AS imagem
    FROM tb_filme
  `;
  const params = [];
  if (nome) {
    comando += " WHERE nm_filme LIKE ?";
    params.push(`%${nome}%`);
  }
  const [resposta] = await con.query(comando, params);
  return resposta;
}

// === DELETAR FILME ===
export async function deletarFilme(id) {
  const comando = `DELETE FROM tb_filme WHERE id_filme = ?`;
  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}
