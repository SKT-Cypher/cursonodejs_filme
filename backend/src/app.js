import './utils/global.js';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import adicionarRotas from './rotas.js';
import path from "path";

// Criar servidor
const servidor = express();

// Middlewares
servidor.use(cors());
servidor.use(express.json());

// Servir arquivos estáticos da pasta storage
servidor.use("/storage", express.static(path.join(process.cwd(), "storage")));

// Configurar controllers / rotas
adicionarRotas(servidor);

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => console.log(` --> API Subiu na porta ${PORTA}`));
