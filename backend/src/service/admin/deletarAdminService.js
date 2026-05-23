import {
    deletarAdmin
}
from "../../repository/adminRepository.js";



export default async function deletarAdmService(
    id
) {

    const linhasAfetadas =
        await deletarAdmin(id);

    if (linhasAfetadas == 0)

        throw new Error(
            "Admin não encontrado"
        );
}