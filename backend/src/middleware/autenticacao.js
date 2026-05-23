import jwt from "jsonwebtoken";

export default function autenticacao(req, resp, next) {

  try {

    const auth =
      req.headers.authorization;

    if (!auth) {

      throw new Error(
        "Token não informado"
      );
    }


    const token =
      auth.replace("Bearer ", "");


    const dados =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    req.usuario = dados;

    next();
  }

  catch (err) {

    resp.status(401).send({
      erro: "Token inválido"
    });
  }
}