import {
    alterarAdmin
}
from "../../repository/adminRepository.js";

import {
    validarCamposObrigatoriosAdmin
}
from "../../validation/admin/adminValidation.js";



export default async function alterarAdmService(
    id,
    adminObj
) {

    validarCamposObrigatoriosAdmin(
        adminObj
    );

    const linhasAfetadas =
        await alterarAdmin(
            id,
            adminObj
        );

    if (linhasAfetadas == 0)

        throw new Error(
            "Admin não encontrado"
        );
}