import { Router }
from "express";

import jwt from "jsonwebtoken";

import autenticacao
from "../middleware/autenticacao.js";

import salvarAdmService
from "../service/admin/salvarAdminService.js";

import listarAdmService
from "../service/admin/listarAdminService.js";

import alterarAdmService
from "../service/admin/alterarAdminService.js";

import deletarAdmService
from "../service/admin/deletarAdminService.js";

import loginAdmService
from "../service/admin/loginAdminService.js";


const endpoints = Router();


// ==========================
// CADASTRAR ADMIN
// ==========================

endpoints.post(

  "/admin",

  autenticacao,

  async (req, resp) => {

    try {

      const {
        nome,
        email,
        senha,
        cpf
      } = req.body;


      const adminObj = {

        nome,
        email,
        senha,
        cpf
      };


      const id =
        await salvarAdmService(
          adminObj
        );


      resp.send({

        novoId: id
      });
    }

    catch (err) {

      if (err.code == "ER_DUP_ENTRY") {

        if (
          err.sqlMessage.includes(
            "admins.email"
          )
        ) {

          resp.status(400).send({

            erro:
              "Email já cadastrado"
          });

          return;
        }


        if (
          err.sqlMessage.includes(
            "admins.cpf"
          )
        ) {

          resp.status(400).send({

            erro:
              "CPF já cadastrado"
          });

          return;
        }
      }


      resp.status(400).send({

        erro: err.message
      });
    }
  }
);


// ==========================
// LISTAR ADMINS
// ==========================

endpoints.get(

  "/admin",

  autenticacao,

  async (req, resp) => {

    try {

      const registros =
        await listarAdmService();

      resp.send(registros);
    }

    catch (err) {

      resp.status(400).send({

        erro: err.message
      });
    }
  }
);


// ==========================
// ALTERAR ADMIN
// ==========================

endpoints.put(

  "/admin/:id",

  autenticacao,

  async (req, resp) => {

    try {

      const id =
        req.params.id;

      const {
        nome,
        email,
        senha,
        cpf
      } = req.body;


      const adminObj = {

        nome,
        email,
        senha,
        cpf
      };


      await alterarAdmService(

        id,
        adminObj
      );


      resp.send();
    }

    catch (err) {

      if (err.code == "ER_DUP_ENTRY") {

        if (
          err.sqlMessage.includes(
            "admins.email"
          )
        ) {

          resp.status(400).send({

            erro:
              "Email já cadastrado"
          });

          return;
        }


        if (
          err.sqlMessage.includes(
            "admins.cpf"
          )
        ) {

          resp.status(400).send({

            erro:
              "CPF já cadastrado"
          });

          return;
        }
      }


      resp.status(400).send({

        erro: err.message
      });
    }
  }
);


// ==========================
// DELETAR ADMIN
// ==========================

endpoints.delete(

  "/admin/:id",

  autenticacao,

  async (req, resp) => {

    try {

      const id =
        req.params.id;

      await deletarAdmService(id);

      resp.send({

        mensagem:
          "Admin deletado com sucesso"
      });
    }

    catch (err) {

      resp.status(400).send({

        erro: err.message
      });
    }
  }
);


// ==========================
// LOGIN ADMIN + JWT
// ==========================

endpoints.post(

  "/admin/login",

  async (req, resp) => {

    try {

      const {
        email,
        senha
      } = req.body;


      const admin =
        await loginAdmService(
          email,
          senha
        );


      const token = jwt.sign(

        {
          id: admin.id,
          email: admin.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "2h"
        }
      );


      resp.send({

        token,

        admin: {

          id: admin.id,

          nome: admin.nome,

          email: admin.email
        }
      });
    }

    catch (err) {

      resp.status(401).send({

        erro: err.message
      });
    }
  }
);

export default endpoints;