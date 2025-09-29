import './utils/global.js';

import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import adicionarRotas from './rotas.js';



const servidor = express();
servidor.use(cors());
servidor.use(express.json());

//confugra os controllers
adicionarRotas(servidor)

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => console.log(` --> API Subiu na porta ${PORTA}`))
