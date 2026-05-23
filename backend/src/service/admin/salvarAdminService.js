import { inserirAdmin }
from "../../repository/adminRepository.js";

import {
    validarCamposObrigatoriosAdmin
}
from "../../validation/admin/adminValidation.js";



export default async function salvarAdmService(
    adminObj
) {

    validarCamposObrigatoriosAdmin(
        adminObj
    );

    const id =
        await inserirAdmin(
            adminObj
        );

    return id;
}