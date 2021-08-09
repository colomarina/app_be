import { Request, Response } from 'express';
import { mensaje_error, usuario } from "../routes/constantes";
import { logger } from '../config/winston.config';
import { carritoModel } from '../db/models/carts.model';
import { enviarMailEthereal } from '../service/mail';
import { sendSMS, sendWhatsApp } from '../service/message';
import model from '../db/index.db'

module.exports = {

  getOne: async (req: Request, res: Response) => {
    const cart: any = await model?.traerCarrito(req.params.carrito_id);
    if (cart.errorType) {
      res.status(400).json({
        message: `No existe el carrito con ID: ${req.params.carrito_id}`
      });
    } else {
      res.status(200).json(cart)
    }
  },

  add: async (req: Request, res: Response) => {
    //Agregar producto al carrito
    const idCart = req.params.carrito_id;
    const { productoId, cantidad } = req.body;
    const agregarAlCarrito: any = await model?.hasStock({ productoId, cantidad });
    if (agregarAlCarrito.errorType) {
      return res.status(400).json({ message: 'El id del producto no existe' });
    }
    if (agregarAlCarrito.sePuede) {
      const cart: any = await model?.agregarProductoEnCarrito(idCart, { productoId, cantidad, stock: agregarAlCarrito.stock, precio: agregarAlCarrito.precio });
      if (cart.errorType) {
        return res.status(400).json({ message: 'Hubo un incoveniente al agregar el producto al carrito' });
      }
      const carrito = await model?.traerCarrito(idCart);
      return res.status(200).json(carrito);
    } else {
      return res.status(400).json({ message: 'La Cantidad solicitada es invalida' });
    }
  },

  delete: async (req: Request, res: Response) => {
    //Eliminar producto al carrito 
    const idCart = req.params.carrito_id;
    const { productoId, cantidad } = req.body;
    const productoEliminadoCarrito: any = await model?.traerCarrito(idCart);
    if (productoEliminadoCarrito.errorType) {
      return res.status(400).json({ message: 'El ID del Carrito no existe' });
    }
    const existeProducto: any = productoEliminadoCarrito.productos.find((p: any) => p.productoId === productoId)
    if (existeProducto) {
      if (cantidad <= existeProducto.cantidad) {
        const eliminarProducto = {
          eliminar: (cantidad === existeProducto.cantidad) ,
          producto: existeProducto
        }
        const cart: any = await model?.eliminarProductoEnCarrito(idCart, { productoId, cantidad }, eliminarProducto);
        console.log(cart)
        if (cart.errorType) {
          return res.status(400).json({ message: 'Hubo un incoveniente al agregar el producto al carrito' });
        }
        // const carrito = await model?.traerCarrito(idCart);
        return res.status(200).json({message: 'Nose'});
      } else {
        return res.status(400).json({ message: 'La Cantidad solicitada es invalida' });
      }
    } else {
      return res.status(400).json({ message: 'El ID del Producto no existe' });
    }
  },

  submit: async (req: Request, res: Response) => {
    //Agregar producto al carrito
    const idCart = req.params.carrito_id;
    const carrito: any = await model?.traerCarrito(idCart);
    if (carrito.errorType) {
      return res.status(400).json({ message: 'El ID del Carrito no existe' });
    } else {
      if (carrito.productos.length === 0) {
        return res.status(400).json({ message: 'El Carrito esta vacio' });
      } else {
        const ordenGenerada: any = await model?.crearOrden(carrito);
        if (ordenGenerada.errorType) {
          return res.status(400).json({ message: 'Hubo un incoveniente al generar la nueva Orden' });
        } else {
          // limpiar carrito
          // enviar mail
          return res.status(201).json(ordenGenerada);
        }
      }
    }
  },
}