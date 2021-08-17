import { Request, Response } from 'express';
import { enviarMailEthereal } from '../service/mail';
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
          productos: productoEliminadoCarrito.productos.filter((p: any) => p.productoId !== productoId)
        }
        const cart: any = await model?.eliminarProductoEnCarrito(idCart, { productoId, cantidad }, eliminarProducto);
        if (cart.errorType) {
          return res.status(400).json({ message: 'Hubo un incoveniente al eliminar el producto al carrito' });
        }
        const carrito = await model?.traerCarrito(idCart);
        return res.status(200).json(carrito);
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
          const vaciarCarrito = await model?.vaciarProductosDelCarrito(idCart)
          const datosUsuario: any = await model?.traerUserById(ordenGenerada.userId)
          const mail = {
            a: datosUsuario.email,
            asunto: 'Solicitud de Orden',
            html: `
            <h1>¡Hola ${datosUsuario.nombreCompleto}!</h1><br>
            <div>
              <h3>Total de la orden: ${ordenGenerada.totalOrder}</h3><br>
              <h3>Tu orden:</h3><br>
              <table>
                <tbody>
                ${ordenGenerada.items.forEach((item: any) => {
                  return `
                    <tr>
                      <td>Identificacion del Producto: ${item.productId}</td>
                      <td>Identificacion del Producto: ${item.cantidad}</td>
                      <td>Identificacion del Producto: ${item.precio}</td>
                    </tr>
                  `
                })}
                </tbody>
              </table>
            </div><br>
            <div>
              <h3>Direccion de entrega:</h3><br>
              <p>
                Calle: ${ordenGenerada.direccion.calle}<br>
                Altura: ${ordenGenerada.direccion.altura}<br>
                Codigo Postal: ${ordenGenerada.direccion.codigoPostal}<br>
                Piso: ${ordenGenerada.direccion.piso}<br>
                Departamento: ${ordenGenerada.direccion.departamento}<br>
              </p>
            </div>
            `
          }
          enviarMailEthereal(mail)
          return res.status(201).json(ordenGenerada);
        }
      }
    }
  },
}