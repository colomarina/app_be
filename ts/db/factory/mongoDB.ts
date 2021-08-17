import mongoose, { Error } from 'mongoose';
import bCrypt from "bcrypt";
import { messageModel } from '../models/message.model';
import { productoModel } from '../models/product.model';
import { carritoModel } from '../models/carts.model';
import { logger } from '../../config/winston.config';
import { orderModel } from '../models/orders.model';
import { MessageType, ProductoType } from '../../types/types';
const config = require('../../config/config');
const UserModel = require('../models/user');

export default class persistenciaMongo {
  constructor() {
    ; (async () => {
      try {
        await mongoose.connect(
          config.MONGO_URL || '', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        });
        console.log('Base de datos conectada')
      }
      catch (error) {
        console.log(error)
      }
    })()
  }

  /* PRODUCTOS */

  traerProductos = async (): Promise<string> => {
    return await productoModel.find({});
  }
  traerProductosPorCategoria = async (category: string): Promise<string> => {
    return await productoModel.find({ categoria: category });
  }
  traerProducto = async (id: string): Promise<string> => {
    return await productoModel.findById(id);
  }
  agregarProducto = async (producto: ProductoType): Promise<object> => {
    try {
      const productoSaved = new productoModel(producto)
      const resultado = await productoSaved.save()
      return resultado
    } catch (error: any) {
      return {
        errorType: error.kind,
        errorMessage: 'Producto no agregado'
      }
    }
  }
  actualizarProducto = async (id: string, producto: any): Promise<object> => {
    try {
      const resultado = await productoModel.findByIdAndUpdate({
        _id: id
      }, {
        $set: producto
      });
      return resultado
    } catch (error: any) {
      return {
        errorType: error.kind,
        errorMessage: 'Producto no actualizado'
      }
    }
  }
  eliminarProducto = async (id: string): Promise<object> => {
    try {
      const resultado = await productoModel.findByIdAndDelete(id);
      return resultado
    } catch (error: any) {
      return {
        errorType: error.kind,
        errorMessage: 'Id no encontrado'
      }
    }
  }

  hasStock = async ({ productoId, cantidad }: any) => {
    try {
      const { stock, precio } = await productoModel.findById(productoId);
      if (cantidad <= stock) {
        return { sePuede: true, stock, precio }
      } else {
        return { sePuede: false }
      }
    } catch (error: any) {
      return {
        errorType: error.kind,
        errorMessage: 'Id no encontrado'
      }
    }
  }

  /* MENSAJES */
  traerMensajesDe = async (id: string): Promise<string> => {
    return await messageModel.find({ userId: id });
  }
  agregarMensaje = async (message: MessageType): Promise<string> => {
    const messageSaved = new messageModel(message)
    return await messageSaved.save()
  }

  /* PASSWORD HASH */
  createHash = (password: any) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
  }
  isValidPassword = (user: any, password: any) => {
    return bCrypt.compareSync(password, user.password)
  }

  /* USER */
  updateUser = async (id: any, { nombreCompleto, celular, admin = false }: any): Promise<string> => {
    const userId = id._id;
    return await UserModel.findByIdAndUpdate({
      _id: userId
    }, {
      $set: {
        nombreCompleto,
        celular,
        admin,
      }
    })
  }

  traerUserById = async (id: string): Promise<object> => {
    try {
      const user = await UserModel.findById(id);
      return user
    } catch (error: any) {
      return {
        errorType: error.kind,
        errorMessage: 'Usuario no encontrado'
      }
    }
  }

  traerUser = async (email: string): Promise<string> => {
    return await UserModel.findOne({ email: email });
  }

  /* CARRITO */
  crearCarrito = async (user: any, direccion: any): Promise<string> => {
    const carritoVacio = {
      userId: user._id,
      productos: [],
      direccion
    }
    const carritoCreated = new carritoModel(carritoVacio)
    return await carritoCreated.save()
  }

  traerCarrito = async (id: string): Promise<object> => {
    try {
      return await carritoModel.findById(id);
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  traerCarritoByUserId = async (id: string): Promise<object> => {
    try {
      return await carritoModel.find({ userId: id });
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  vaciarProductosDelCarrito = async (idCart: string): Promise<object> => {
    try {
      const queryCart = { _id: idCart };
      const updateDocumentCart = {
        $set: {
          productos: []
        }
      }
      const carritoVaciado = await carritoModel.updateOne(queryCart, updateDocumentCart);
      return carritoVaciado
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  agregarProductoEnCarrito = async (idCart: string, { productoId, cantidad, stock, precio }: any): Promise<object> => {
    try {
      const queryCart = { _id: idCart };
      const updateDocumentCart = {
        $push: {
          productos: { productoId, cantidad, precio }
        }
      }
      const productoAgregado = await carritoModel.updateOne(queryCart, updateDocumentCart);
      if (productoAgregado) {
        const queryProduct = { _id: productoId };
        const nuevoStockProducto = stock - cantidad;
        const updateDocumentCart = {
          $set: {
            stock: nuevoStockProducto
          }
        }
        const descontarProducto = await productoModel.updateOne(queryProduct, updateDocumentCart);
        if (descontarProducto) {
          return {
            productoAgregado,
            descontarProducto
          }
        }
        return {
          productoAgregado,
        }
      }
      return productoAgregado;
    } catch (error: any) {
      return {
        errorType: error.kind,
      }
    }
  }

  eliminarProductoEnCarrito = async (idCart: string, { productoId, cantidad }: any, eliminarProducto: any): Promise<object> => {
    try {
      if (eliminarProducto.eliminar) {
        // Sacar el producto del array
        const queryCart = { _id: idCart };
        const updateDocumentCart = {
          $set: {
            productos: eliminarProducto.productos
          }
        }
        const productoEliminado = await carritoModel.updateOne(queryCart, updateDocumentCart);
        const { stock } = await productoModel.findById(productoId);
        const queryProduct = { _id: productoId };
        const nuevoStockProducto = stock + cantidad;
        const updateDocumentProducto = {
          $set: {
            stock: nuevoStockProducto
          }
        }
        const agregarStockProducto = await productoModel.updateOne(queryProduct, updateDocumentProducto);
        return {
          productoEliminado
        }
      } else {
        return {
          message: 'No hay que eliminar'
        }
      }
    } catch (error: any) {
      console.log(error)
      return {
        errorType: error.kind,
      }
    }
  }

  /* ORDENES */

  crearOrden = async (orden: any): Promise<object> => {
    try {
      const totalPrice = orden.productos.reduce((total: any, producto: any) => total + (producto.precio * producto.cantidad), 0);
      const items = orden.productos.map((prod: any) => {
        return {
          productId: prod.productoId,
          cantidad: prod.cantidad,
          precio: prod.precio
        }
      })
      const nuevaOrden = {
        userId: orden.userId,
        items: items,
        direccion: orden.direccion,
        estado: 'Generada',
        totalOrder: totalPrice
      }
      const ordenSaved = new orderModel(nuevaOrden)
      const ordenGenerada = await ordenSaved.save()
      return ordenGenerada;
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  traerOrdenesByUserId = async (id: string): Promise<object> => {
    try {
      return await orderModel.find({ userId: id });
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  traerUltimaOrdenByUserId = async (id: string): Promise<object> => {
    try {
      return await orderModel.find({ userId: id }).sort({ $natural: -1 }).limit(1);
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  traerOrdenesById = async (id: string): Promise<object> => {
    try {
      return await orderModel.findById(id);
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  modificarOrden = async (id: string): Promise<object> => {
    try {
      const queryOrder = { _id: id };
      const updateDocumentOrder = {
        $set: {
          estado: 'Completada',
        }
      }
      const modificarOrden = await orderModel.updateOne(queryOrder, updateDocumentOrder);
      return modificarOrden;
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

}


