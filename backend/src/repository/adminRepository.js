import con from "./conection.js";


// ==========================
// CADASTRAR
// ==========================

export async function inserirAdmin(admin) {

    const comando = `
        INSERT INTO admins
        (nome, email, senha, cpf)

        VALUES (?, ?, ?, ?)
    `;

    const resposta =
        await con.query(
            comando,
            [
                admin.nome,
                admin.email,
                admin.senha,
                admin.cpf
            ]
        );

    return resposta[0].insertId;
}



// ==========================
// LISTAR
// ==========================

export async function listarAdmins() {

    const comando = `
        SELECT
            id,
            senha,
            nome,
            email,
            cpf
        FROM admins
    `;

    const resposta =
        await con.query(comando);

    return resposta[0];
}



// ==========================
// ALTERAR
// ==========================

export async function alterarAdmin(
    id,
    admin
) {

    const comando = `
        UPDATE admins
        SET
            nome = ?,
            email = ?,
            senha = ?,
            cpf = ?
        WHERE id = ?
    `;

    const resposta =
        await con.query(
            comando,
            [
                admin.nome,
                admin.email,
                admin.senha,
                admin.cpf,
                id
            ]
        );

    return resposta[0].affectedRows;
}



// ==========================
// DELETAR
// ==========================

export async function deletarAdmin(id) {

    const comando = `
        DELETE FROM admins
        WHERE id = ?
    `;

    const resposta =
        await con.query(
            comando,
            [id]
        );

    return resposta[0].affectedRows;
}



// ==========================
// LOGIN
// ==========================

export async function loginAdmin(
    email,
    senha
) {

    const comando = `
        SELECT
            id,
            nome,
            email
        FROM admins
        WHERE email = ?
        AND senha = ?
    `;

    const resposta =
        await con.query(
            comando,
            [email, senha]
        );

    return resposta[0][0];
}