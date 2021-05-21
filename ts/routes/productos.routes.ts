import { Router } from "express";
import { checkAuthentication } from "../config/passport.config";
const productosController = require('../controller/productos.controller')

let routerProductos = Router();

// Rutas para Productos
routerProductos.get("/productosJSON", productosController.getAll);
// /productos
routerProductos.get("/productos", checkAuthentication, productosController.getAllFront);
routerProductos.post("/productos", checkAuthentication,productosController.create);
// /productos/:producto_id
routerProductos.get("/productos/:producto_id", checkAuthentication, productosController.getOne);
routerProductos.put("/productos/:producto_id", checkAuthentication, productosController.update);
routerProductos.delete("/productos/:producto_id", checkAuthentication, productosController.delete);

// /productos/vista/?nombre=Agua
// /productos/vista/?min_precio=1000&max_precio=3000
routerProductos.get("/productos/vista", checkAuthentication, productosController.getWithFilters);
// /productos/vista-test?cant=5
routerProductos.get("/productos/vista-test", checkAuthentication, productosController.createRandom);
// /desnormalizar
routerProductos.get("/desnormalizar", checkAuthentication, productosController.getAllMensajes);


export default routerProductos;