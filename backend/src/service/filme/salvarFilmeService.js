import { salvarFilme } from "../../repository/filmeRepository.js";
import { validarCamposObrigatoriosFilme } from "../../validation/filme/filmeValidation.js";

export default async function salvarFilmeService(filmeObj) {
  validarCamposObrigatoriosFilme(filmeObj);
  const id = await salvarFilme(filmeObj);
  return id;
}
