import mongoose, { Error } from 'mongoose';
import bCrypt from "bcrypt";
import { messageModel } from '../models/message.model';
import { productoModel } from '../models/product.model';
import { carritoModel } from '../models/carts.model';
import { logger } from '../../config/winston.config';
import { orderModel } from '../models/orders.model';
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
  agregarProducto = async (producto: any): Promise<string> => {
    try {
      const productoSaved = new productoModel(producto)
      const resultado = await productoSaved.save()
      return resultado
    } catch (error) {
      logger.error(error)
      return '';
    }
  }
  actualizarProducto = async (id: string, producto: any): Promise<string> => {
    try {
      const resultado = await productoModel.findByIdAndUpdate({
        _id: id
      }, {
        $set: producto
      });
      return resultado
    } catch (error) {
      logger.error(error)
      return '';
    }
  }
  eliminarProducto = async (id: string): Promise<string> => {
    try {
      const resultado = await productoModel.findByIdAndDelete(id);
      return resultado
    } catch (error) {
      logger.error(error)
      return '';
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
  traerMensajes = async (): Promise<string> => {
    return await messageModel.find({});
  }
  agregarMensaje = async (mensaje: any): Promise<string> => {
    const mensajeSaved = new messageModel(mensaje)
    return await mensajeSaved.save()
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
  // traerUser = async (id: string): Promise<string> => {
  //   return await UserModel.findById(id);
  // }
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
          $pull: {
            productos: {
              $elemMatch: eliminarProducto.producto
            }
          }
        }
        const productoEliminado = await carritoModel.updateOne(queryCart, updateDocumentCart);
        console.log(productoEliminado)
        return {
          message: 'Fue eliminado?'
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

  traerCarrito = async (id: string): Promise<object> => {
    try {
      return await carritoModel.findById(id);
    } catch (error: any) {
      return {
        errorType: error.kind
      }
    }
  }

  /* ORDENES */

  crearOrden = async (orden: any): Promise<object> => {
    try {
      const totalPrice = orden.productos.reduce((total: any, producto: any) => total + producto.precio, 0);
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
}


