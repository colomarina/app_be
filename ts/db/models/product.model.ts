import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose from 'mongoose';

const productoCollection = 'producto'

// const ProductoSchema = new mongoose.Schema({
//     timestamp: { type: Date, default: Date.now},
//     nombre: { type: String, required: true, max: 70 },
//     descripcion: { type: String, required: true, max: 100},
//     codigo: { type: Number, required: true },
//     foto: { type: String, required: true, max: 70 },
//     precio: { type: Number, required: true },
//     stock: { type: Number, required: true }
// })

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 70 },
    descripcion: { type: String, required: true, max: 100},
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    foto: { type: String },
})

export const productoModel = mongoose.model(productoCollection, ProductoSchema);
export const ProductoTC = composeWithMongoose(productoModel);