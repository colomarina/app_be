import { Router } from "express";
const carritoController = require('../controller/carrito.controller')

let routerCarrito = Router();

// Rutas para Carrito

class RouterCarrito {
  controladorCarrito: any;

  constructor() {
      this.controladorCarrito = carritoController;
  }

  start() {
    routerCarrito.get("/cart/:carrito_id", carritoController.getOne);
    
    routerCarrito.post("/cart/add/:carrito_id",carritoController.add);
    
    routerCarrito.post("/cart/delete/:carrito_id",carritoController.delete);

    routerCarrito.post("/cart/submit/:carrito_id",carritoController.submit);
    
    return routerCarrito
  }
}


export default RouterCarrito;