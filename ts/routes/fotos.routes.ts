import { Router } from "express";
const fotosController = require('../controller/fotos.controller')

let routerFotos = Router();

class RouterFotos {
  controladorFotos: any;

  constructor() {
      this.controladorFotos = fotosController;
  }

  start() {
    routerFotos.post('/image/upload', this.controladorFotos.create)
    routerFotos.get('/image/:id', this.controladorFotos.getOne)
    routerFotos.delete('/image/:id', this.controladorFotos.delete)

      return routerFotos
  }
}

export default RouterFotos;