import mongoose from 'mongoose';

const productoCollection = 'producto'

const ProductoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now},
    nombre: { type: String, required: true, max: 70 },
    descripcion: { type: String, required: true, max: 100},
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 70 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
})

export const productoModel = mongoose.model(productoCollection, ProductoSchema)