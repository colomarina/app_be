import { Router } from "express";
const carritoController = require('../controller/carrito.controller')

let routerCarrito = Router();

// Rutas para Carrito

routerCarrito.get("/carrito/:carrito_id", carritoController.getOne);

routerCarrito.post("/carrito",carritoController.create);

routerCarrito.put("/carrito/:carrito_id",carritoController.update);

routerCarrito.post("/finalizarCompra", carritoController.finishBuying)

export default routerCarrito;