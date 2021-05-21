"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_config_1 = require("../config/passport.config");
const productosController = require('../controller/productos.controller');
let routerProductos = express_1.Router();
// Rutas para Productos
routerProductos.get("/productosJSON", productosController.getAll);
// /productos
routerProductos.get("/productos", passport_config_1.checkAuthentication, productosController.getAllFront);
routerProductos.post("/productos", passport_config_1.checkAuthentication, productosController.create);
// /productos/:producto_id
routerProductos.get("/productos/:producto_id", passport_config_1.checkAuthentication, productosController.getOne);
routerProductos.put("/productos/:producto_id", passport_config_1.checkAuthentication, productosController.update);
routerProductos.delete("/productos/:producto_id", passport_config_1.checkAuthentication, productosController.delete);
// /productos/vista/?nombre=Agua
// /productos/vista/?min_precio=1000&max_precio=3000
routerProductos.get("/productos/vista", passport_config_1.checkAuthentication, productosController.getWithFilters);
// /productos/vista-test?cant=5
routerProductos.get("/productos/vista-test", passport_config_1.checkAuthentication, productosController.createRandom);
// /desnormalizar
routerProductos.get("/desnormalizar", passport_config_1.checkAuthentication, productosController.getAllMensajes);
exports.default = routerProductos;
