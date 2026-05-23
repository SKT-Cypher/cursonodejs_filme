import { Router } from "express";
import multer from "multer";

import autenticacao from "../middleware/autenticacao.js";
import salvarFilmeService from "../service/filme/salvarFilmeService.js";
import consultarFilmesService from "../service/filme/consultarFilmesService.js";
import consultarFilmeIdService from "../service/filme/consultarFilmeIdService.js";
import alterarFilmeService from "../service/filme/alterarFilmeService.js";
import deletarFilmeService from "../service/filme/deletarFilmeService.js";

const endpoints = Router();


// ==========================
// CONFIG MULTER
// ==========================

const storage = multer.diskStorage({

  destination: (req, file, cb) =>

    cb(null, "./storage/capa"),


  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );
  },
});

const upload = multer({ storage });



// ==========================
// CADASTRAR FILME
// ==========================

endpoints.post(
  "/filme", autenticacao,
  upload.single("imagem"),

  async (req, resp) => {

    try {

      const {
        nome,
        sinopse,
        avaliacao,
        lancamento,
        disponivel,
        categoria,
        duracao,
        classificacao
      } = req.body;


      const imagem =
        req.file
          ? req.file.filename
          : null;


      const filmeObj = {

        nome,
        sinopse,
        avaliacao,
        lancamento,
        disponivel,
        categoria,
        duracao,
        classificacao,
        imagem,
      };


      const id =
        await salvarFilmeService(
          filmeObj
        );


      resp.send({
        novoId: id,
      });

    }

    catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);



// ==========================
// CONSULTAR FILMES
// ==========================

endpoints.get(
  "/filme",

  async (req, resp) => {

    try {

      const nome =
        req.query.nome;


      const registros =
        await consultarFilmesService(
          nome
        );


      resp.send(registros);

    }

    catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);



// ==========================
// CONSULTAR FILME POR ID
// ==========================

endpoints.get(
  "/filme/:id",

  async (req, resp) => {

    try {

      const id =
        req.params.id;


      const filme =
        await consultarFilmeIdService(
          id
        );


      resp.send(filme);

    }

    catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);



// ==========================
// ALTERAR FILME
// ==========================

endpoints.put(
  "/filme/:id", autenticacao,
  upload.single("imagem"),

  async (req, resp) => {

    try {

      const id =
        req.params.id;


      const filmeExistente =
        await consultarFilmeIdService(
          id
        );


      const {
        nome,
        sinopse,
        avaliacao,
        lancamento,
        disponivel,
        categoria,
        duracao,
        classificacao
      } = req.body;


      const imagem =
        req.file
          ? req.file.filename
          : filmeExistente.imagem;


      const filmeObj = {

        nome,
        sinopse,
        avaliacao,
        lancamento,
        disponivel,
        categoria,
        duracao,
        classificacao,
        imagem,
      };


      await alterarFilmeService(
        filmeObj,
        id
      );


      resp.status(204).send();

    }

    catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);



// ==========================
// DELETAR FILME
// ==========================

endpoints.delete(
  "/filme/:id", autenticacao,

  async (req, resp) => {

    try {

      const id =
        req.params.id;


      await deletarFilmeService(id);


      resp.status(204).send();

    }

    catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);


export default endpoints;