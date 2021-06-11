require('dotenv').config()
import mongoose from 'mongoose';
import bCrypt from "bcrypt";
import { Mensaje, Producto, Productos } from "../routes/objetos";
import { mensajeModel } from "./models/mensajes.model";
import { productoModel } from './models/producto.model';
import { carritoModel } from './models/carrito.model';
const UserModel = require('../db/models/user');

const conn = mongoose.connect(
  process.env.MONGO_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
);

export const connect = async (): Promise<any> => {
  return await conn
}

// PRODUCTOS

export const traerProductos = async (): Promise<string> => {
  return await productoModel.find({});
};
export const traerProducto = async (id: string): Promise<string> => {
  return await productoModel.findById(id);
};
export const agregarProducto = async (producto: Producto): Promise<string> => {
  const productoSaved = new productoModel(producto)
  return await productoSaved.save()
};
export const actualizarProducto = async (id: string, producto: any): Promise<string> => {
  return await productoModel.findByIdAndUpdate({
    _id: id
  }, {
    $set: producto
  })
};
export const eliminarProducto = async (id: string): Promise<string> => {
  return await productoModel.findByIdAndDelete(id);
};
export const traerProductosXNombres = async (nombre: any): Promise<string> => {
  let reg = new RegExp(`^${nombre}`);
  return await productoModel.find({ nombre: reg });
};
export const traerProductosXRangoPrecios = async (min_precio: any, max_precio: any): Promise<string> => {
  return await productoModel.find({ $and: [{ precio: { $gte: min_precio } }, { precio: { $lte: max_precio } }] });
};

//  MENSAJES
export const traerMensajes = async (): Promise<string> => {
  return await mensajeModel.find({});
};
export const agregarMensaje = async (mensaje: Mensaje): Promise<string> => {
  const mensajeSaved = new mensajeModel(mensaje)
  return await mensajeSaved.save()
};

// PASSWORD HASH 

export const createHash = (password: any) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

export const isValidPassword = (user: any, password: any) => {
  return bCrypt.compareSync(password, user.password)
}

// UPDATE USER

export const updateUser = async (id: any, user: any): Promise<string> => {
  const userId = id._id;
  return await UserModel.findByIdAndUpdate({
    _id: userId
  }, {
    $set: {
      nombreCompleto: user.nombreCompleto,
      direccion: user.direccion,
      edad: user.edad,
      celular: user.celular,
      foto: user.foto,
    }
  })
};

export const traerUser = async (id: string): Promise<string> => {
  return await UserModel.findById(id);
};

// CARRITO

export const crearCarrito = async (user: any): Promise<string> => {
  const carritoVacio = {
    usuario: user._id,
    productos: []
  }
  const carritoCreated = new carritoModel(carritoVacio)
  return await carritoCreated.save()
};

export const agregarProductoEnCarrito = async (idCarrito: string, producto: any): Promise<string> => {
  const query = {_id: idCarrito};
  const updateDocument = {
    $push: {
      productos: producto
    }    
  }
  return await carritoModel.updateOne(query, updateDocument);
};

export const traerCarrito = async (id: string): Promise<string> => {
  return await carritoModel.findById(id);
};