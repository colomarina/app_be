import { Router } from "express";
import passport from "passport";
const productosController = require('../controller/productos.controller')

let routerProductos = Router();
// Rutas para Productos

class RouterProductos {
  controladorProductos: any;

  constructor() {
      this.controladorProductos = productosController;
  }

  start() {
      routerProductos.get('/productos', this.controladorProductos.getAll)
      // routerProductos.get('/productos/:producto_id', this.controladorProductos.getOne)
      routerProductos.get('/productos/:category', this.controladorProductos.getAll)
      routerProductos.post('/productos', this.controladorProductos.create)
      routerProductos.put('/productos/:producto_id', this.controladorProductos.update)
      routerProductos.delete('/productos/:producto_id', this.controladorProductos.delete)

      return routerProductos
  }
}

export default RouterProductos;