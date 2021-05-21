"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constantes_1 = require("../routes/constantes");
let routerCarritos = express_1.Router();
// Rutas para Carritos
// console.log(carrito)
routerCarritos.get('/carritos/:carrito_id', (req, res) => {
    // Listar 1 carrito
    if (constantes_1.carrito.listar_productos().listar().length === 0) {
        constantes_1.mensaje_error.error = "1";
        constantes_1.mensaje_error.descripcion = "No hay productos cargados";
        res.json(constantes_1.mensaje_error);
    }
    res.json(constantes_1.carrito.listar_productos());
});
routerCarritos.post('/carritos/:producto_id', (req, res) => {
    // Agregar 1 producto a la lista de productos
    const productoAgregar = constantes_1.listaProductos.buscar(req.params.producto_id);
    if (!productoAgregar) {
        constantes_1.mensaje_error.error = "1";
        constantes_1.mensaje_error.descripcion = "Producto no encontrado en el carrito";
        res.json(constantes_1.mensaje_error);
    }
    else {
        constantes_1.carrito.agregar_producto(productoAgregar);
        res.json(constantes_1.carrito);
    }
});
routerCarritos.delete('/carritos/:producto_id', (req, res) => {
    // Eliminar un producto del carrito
    const produ_eliminar = constantes_1.listaProductos.buscar(req.params.producto_id);
    if (!produ_eliminar) {
        constantes_1.mensaje_error.error = "1";
        constantes_1.mensaje_error.descripcion = "Producto no encontrado en el carrito, no se puede eliminar";
        res.json(constantes_1.mensaje_error);
    }
    constantes_1.carrito.eliminar_producto(req.params.producto_id);
    res.json(produ_eliminar);
});
exports.default = routerCarritos;
