import mongoose from 'mongoose';
import { productoModel } from './producto.model';

const carritoCollection = 'carrito'

const CarritoSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productos: [
    {
      timestamp: { type: Date, default: Date.now },
      nombre: { type: String, required: true, max: 70 },
      descripcion: { type: String, required: true, max: 100 },
      codigo: { type: Number, required: true },
      foto: { type: String, required: true, max: 70 },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true }
    }
  ],
  usuario: {type: String}
})

export const carritoModel = mongoose.model(carritoCollection, CarritoSchema)