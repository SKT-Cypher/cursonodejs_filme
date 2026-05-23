export function validarCamposObrigatoriosAdmin(
    adminObj
) {

    if (
        !adminObj.nome ||
        adminObj.nome.trim() == ""
    )

        throw new Error(
            "Nome do Adm obrigatório"
        );


    if (
        !adminObj.email ||
        adminObj.email.trim() == ""
    )

        throw new Error(
            "Email do Adm obrigatório"
        );


    if (
        !adminObj.senha ||
        adminObj.senha.trim() == ""
    )

        throw new Error(
            "Senha do Adm obrigatória"
        );


    if (
        !adminObj.cpf ||
        adminObj.cpf.trim() == ""
    )

        throw new Error(
            "CPF do Adm obrigatório"
        );
}



// ==========================
// EMAIL JÁ EXISTE
// ==========================

export function validarEmailExistente(
    registros
) {

    if (registros.length > 0)

        throw new Error(
            "Já existe esse email cadastrado!"
        );
}



// ==========================
// CPF JÁ EXISTE
// ==========================

export function validarCpfExistente(
    registros
) {

    if (registros.length > 0)

        throw new Error(
            "Já existe esse CPF cadastrado!"
        );
}



// ==========================
// LOGIN INVÁLIDO
// ==========================

export function validarLogin(
    admin
) {

    if (!admin)

        throw new Error(
            "Email ou senha inválidos"
        );
}