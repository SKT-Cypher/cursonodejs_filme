import express from 'express';
import filmeController from './controller/filmeController.js';

export default function adicionarRotas(servidor){
    servidor.use(filmeController);

    servidor.use('/storage/capa' , express.static('./storage/capa'));
}