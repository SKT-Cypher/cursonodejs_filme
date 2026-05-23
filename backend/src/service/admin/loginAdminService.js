import {
    loginAdmin
}
from "../../repository/adminRepository.js";



export default async function loginAdmService(
    email,
    senha
) {

    const admin =
        await loginAdmin(
            email,
            senha
        );

    if (!admin)

        throw new Error(
            "Email ou senha inválidos"
        );

    return admin;
}