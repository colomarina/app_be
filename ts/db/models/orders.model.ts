import mongoose from 'mongoose';

const orderCollection = 'orders'

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true},
    }
  ],
  timestamp: { type: Date, default: Date.now },
  direccion: {
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    piso: { type: String },
    departamento: { type: String },
  },
  estado: { type: String },
  totalOrder: { type: Number, required: true },
})

export const orderModel = mongoose.model(orderCollection, OrderSchema)