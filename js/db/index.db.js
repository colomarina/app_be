"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traerCarrito = exports.agregarProductoEnCarrito = exports.crearCarrito = exports.traerUser = exports.updateUser = exports.isValidPassword = exports.createHash = exports.agregarMensaje = exports.traerMensajes = exports.traerProductosXRangoPrecios = exports.traerProductosXNombres = exports.eliminarProducto = exports.actualizarProducto = exports.agregarProducto = exports.traerProducto = exports.traerProductos = exports.connect = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mensajes_model_1 = require("./models/mensajes.model");
const producto_model_1 = require("./models/producto.model");
const carrito_model_1 = require("./models/carrito.model");
const UserModel = require('../db/models/user');
const conn = mongoose_1.default.connect(process.env.MONGO_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield conn;
});
exports.connect = connect;
// PRODUCTOS
const traerProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield producto_model_1.productoModel.find({});
});
exports.traerProductos = traerProductos;
const traerProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield producto_model_1.productoModel.findById(id);
});
exports.traerProducto = traerProducto;
const agregarProducto = (producto) => __awaiter(void 0, void 0, void 0, function* () {
    const productoSaved = new producto_model_1.productoModel(producto);
    return yield productoSaved.save();
});
exports.agregarProducto = agregarProducto;
const actualizarProducto = (id, producto) => __awaiter(void 0, void 0, void 0, function* () {
    return yield producto_model_1.productoModel.findByIdAndUpdate({
        _id: id
    }, {
        $set: producto
    });
});
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield producto_model_1.productoModel.findByIdAndDelete(id);
});
exports.eliminarProducto = eliminarProducto;
const traerProductosXNombres = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    let reg = new RegExp(`^${nombre}`);
    return yield producto_model_1.productoModel.find({ nombre: reg });
});
exports.traerProductosXNombres = traerProductosXNombres;
const traerProductosXRangoPrecios = (min_precio, max_precio) => __awaiter(void 0, void 0, void 0, function* () {
    return yield producto_model_1.productoModel.find({ $and: [{ precio: { $gte: min_precio } }, { precio: { $lte: max_precio } }] });
});
exports.traerProductosXRangoPrecios = traerProductosXRangoPrecios;
//  MENSAJES
const traerMensajes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield mensajes_model_1.mensajeModel.find({});
});
exports.traerMensajes = traerMensajes;
const agregarMensaje = (mensaje) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajeSaved = new mensajes_model_1.mensajeModel(mensaje);
    return yield mensajeSaved.save();
});
exports.agregarMensaje = agregarMensaje;
// PASSWORD HASH 
const createHash = (password) => {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
};
exports.createHash = createHash;
const isValidPassword = (user, password) => {
    return bcrypt_1.default.compareSync(password, user.password);
};
exports.isValidPassword = isValidPassword;
// UPDATE USER
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = id._id;
    return yield UserModel.findByIdAndUpdate({
        _id: userId
    }, {
        $set: {
            nombreCompleto: user.nombreCompleto,
            direccion: user.direccion,
            edad: user.edad,
            celular: user.celular,
            foto: user.foto,
        }
    });
});
exports.updateUser = updateUser;
const traerUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserModel.findById(id);
});
exports.traerUser = traerUser;
// CARRITO
const crearCarrito = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const carritoVacio = {
        usuario: user._id,
        productos: []
    };
    const carritoCreated = new carrito_model_1.carritoModel(carritoVacio);
    return yield carritoCreated.save();
});
exports.crearCarrito = crearCarrito;
const agregarProductoEnCarrito = (idCarrito, producto) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: idCarrito };
    const updateDocument = {
        $push: {
            productos: producto
        }
    };
    return yield carrito_model_1.carritoModel.updateOne(query, updateDocument);
});
exports.agregarProductoEnCarrito = agregarProductoEnCarrito;
const traerCarrito = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield carrito_model_1.carritoModel.findById(id);
});
exports.traerCarrito = traerCarrito;
