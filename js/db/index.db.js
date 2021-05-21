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
exports.isValidPassword = exports.createHash = exports.agregarMensaje = exports.traerMensajes = exports.traerProductosXRangoPrecios = exports.traerProductosXNombres = exports.eliminarProducto = exports.actualizarProducto = exports.agregarProducto = exports.traerProducto = exports.traerProductos = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mensajes_model_1 = require("./models/mensajes.model");
const producto_model_1 = require("./models/producto.model");
// 'mongodb+srv://colito:LM753951@cluster0.yjnag.mongodb.net/ecommerce' 
const conn = mongoose_1.default.connect('mongodb+srv://colito:LM753951@cluster0.yjnag.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
