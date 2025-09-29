import con from './conection.js';

export async function salvarFilme(filme){
    let comando = `
    INSERT INTO   tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
            VALUES (?, ?, ?, ?, ?)
    `
    let respota = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel ]);
    let info = respota[0];

    let idFilme = info.insertId
    return idFilme;
}



export async function consultarFilmesNome(nome){
    let comando;
    let parametros = [];

    if(nome) {
        // Busca por nome
        comando = `
        SELECT  id_filme      id,
                nm_filme      nome,         
                vl_avaliacao  avaliacao,
                dt_lancamento lançamento,
                bt_disponivel disponivel
        FROM tb_filme
        WHERE nm_filme LIKE ?
        `;
        parametros = ['%' + nome + '%'];
    } else {
        // Busca todos os filmes
        comando = `
        SELECT  id_filme      id,
                nm_filme      nome,         
                vl_avaliacao  avaliacao,
                dt_lancamento lançamento,
                bt_disponivel disponivel
        FROM tb_filme
        `;
    }

    let resposta = await con.query(comando, parametros);
    return resposta[0];
}

export async function consultarFilmesId(id){
    let comando = `
    SELECT  id_filme                id,
            nm_filme                nome,  
            ds_sinopse              sinopse,       
            vl_avaliacao           avaliacao,
            dt_lancamento          lançamento,
            bt_disponivel           disponivel,
            img_filme               img
    FROM    tb_filme
    WHERE   id_filme = ?
    `

    let respota = await con.query(comando, [id]);
    let registros = respota[0];

    return registros;
}


export default async function alterarFilme(filme, id){
    let comando = `
    UPDATE tb_filme
        SET nm_filme = ?,
            ds_sinopse = ?,
            vl_avaliacao = ?,
            dt_lancamento = ?,
            bt_disponivel = ?
        WHERE id_filme = ?;
    `
     let resposta = await con.query(comando, [
        filme.nome,
        filme.sinopse, 
        filme.avaliacao,
        filme.lancamento, 
        filme.disponivel,
        id]);

        let info = resposta[0];
        let linhasAfetadas = info.affectedRows
        return linhasAfetadas;

}

export  async function deletarFilme(id){
    let comando = `
    DELETE FROM tb_filme WHERE id_filme = ?
    `

    let resposta = await con.query(comando,[id]);
    let info = resposta[0];
    let linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
}

export async function alterarCapaFilme(id, caminho) {
    let comando = `
        UPDATE tb_filme
        SET img_filme = ?
        WHERE id_filme = ?;
    `;

    let resposta = await con.query(comando, [caminho, id]);

    let info = resposta[0];
    let linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
}