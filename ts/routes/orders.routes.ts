import { Router } from "express";
const ordersController = require('../controller/orders.controller')

let routerOrders = Router();

// Rutas para Orders

class RouterOrders {
  controladorCarrito: any;

  constructor() {
      this.controladorCarrito = ordersController;
  }

  start() {
    routerOrders.get("/orders/:user_id", ordersController.getAllOrders);
    
    routerOrders.get("/orders/:order_id",ordersController.getOne);
    
    routerOrders.post("/orders/complete",ordersController.completeOrder);
    
    return routerOrders
  }
}


export default RouterOrders;