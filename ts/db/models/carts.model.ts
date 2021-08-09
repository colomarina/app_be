import mongoose from 'mongoose';

const carritoCollection = 'carrito'

const CarritoSchema = new mongoose.Schema({
  userId: { type: String },
  productos: [
    {
      productoId: { type: String },
      cantidad: { type: Number },
      precio: { type: Number },
    }
  ],
  timestamp: { type: Date, default: Date.now },
  direccion: {
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    piso: { type: String },
    departamento: { type: String },
  }
})

export const carritoModel = mongoose.model(carritoCollection, CarritoSchema)