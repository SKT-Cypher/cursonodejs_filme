import express from 'express';
import filmeController from './controller/filmeController.js';
import adminController from './controller/adminController.js';

export default function adicionarRotas(servidor){
    servidor.use(filmeController);
    servidor.use(adminController);

    servidor.use('/storage/capa' , express.static('./storage/capa'));
}