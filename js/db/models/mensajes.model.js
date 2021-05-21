"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mensajeCollection = 'mensaje';
const MensajeSchema = new mongoose_1.default.Schema({
    mail: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
    dateandhour: { type: String, required: true },
    message: { type: String, required: true }
});
exports.mensajeModel = mongoose_1.default.model(mensajeCollection, MensajeSchema);
