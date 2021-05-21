"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productoCollection = 'producto';
const ProductoSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, default: Date.now },
    nombre: { type: String, required: true, max: 70 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 70 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});
exports.productoModel = mongoose_1.default.model(productoCollection, ProductoSchema);
