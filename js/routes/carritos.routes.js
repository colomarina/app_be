"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController = require('../controller/carrito.controller');
let routerCarrito = express_1.Router();
// Rutas para Carrito
routerCarrito.get("/carrito/:carrito_id", carritoController.getOne);
routerCarrito.post("/carrito", carritoController.create);
routerCarrito.put("/carrito/:carrito_id", carritoController.update);
routerCarrito.post("/finalizarCompra", carritoController.finishBuying);
exports.default = routerCarrito;
