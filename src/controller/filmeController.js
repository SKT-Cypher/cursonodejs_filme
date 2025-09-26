import { Router } from "express";
import salvarFilmeService from "../service/filme/salvarFilmeService.js";
import consultarFilmesService from "../service/filme/consultarFilmesService.js";
import consultarFilmesIdService from "../service/filme/consultarFilmeIdService.js";
import alterarFilmeService from "../service/filme/alterarFilmeService.js";
import deletarFilmeService from "../service/filme/deletarFilmeService.js";
import alterarCapaFilmeService from "../service/filme/alterarCapaFilmeService.js";
import multer from "multer";
const endpoints = Router();


endpoints.post('/filme', async (req, resp) => {

    try {

        let filmeObj = req.body;

        let id =  await salvarFilmeService(filmeObj);
    
        resp.send({
            id: id
        }) 
        
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
        
    }
    
   
})

endpoints.get('/filme', async (req, resp) => {
    try {
        let nome = req.query.nome;
        let registros = await consultarFilmesService(nome);
        resp.send(registros)

    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
});


endpoints.get('/filme/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let filme = await consultarFilmesIdService(id);

        resp.send(filme);
        
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})

endpoints.put('/filme/:id' , async (req, resp) => {
    try {
        let filmeObj = req.body;
        let id = req.params.id; 

        await alterarFilmeService(filmeObj, id);

        resp.status(204).send();
        
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
});

endpoints.delete('/filme/:id' , async (req, resp) => {
    try {
         
        let id = req.params.id;

        await deletarFilmeService(id);

        resp.status(204).send();
        
        
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
});

let updloadCapa = multer({ dest: './storage/capa' });

endpoints.put('/filme/:id/imagem', updloadCapa.single('imagem'), async (req, resp) => {
    try {
        let id = req.params.id;
        let caminho = req.file.path;

        await alterarCapaFilmeService(id, caminho);

        resp.status(204).send(); 
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
});



export default endpoints;