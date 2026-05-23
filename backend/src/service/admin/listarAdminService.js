import { listarAdmins }
from "../../repository/adminRepository.js";



export default async function listarAdmService() {

    const registros =
        await listarAdmins();

    return registros;
}