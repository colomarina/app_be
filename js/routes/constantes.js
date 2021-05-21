"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fechayhora = exports.usuario = exports.carrito = exports.mensaje_error = exports.listaPCarrito = exports.listaProductos = void 0;
const objetos_1 = require("./objetos");
const uuid_1 = require("uuid");
exports.listaProductos = new objetos_1.Productos();
exports.listaPCarrito = new objetos_1.Productos();
exports.mensaje_error = new objetos_1.Errores("", "");
exports.carrito = new objetos_1.Carrito(uuid_1.v4(), exports.listaPCarrito);
exports.usuario = new objetos_1.Usuario(true);
function fechayhora() {
    const hoy = new Date();
    const fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    const hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fyh = fecha + " " + hora;
    return fyh;
}
exports.fechayhora = fechayhora;
