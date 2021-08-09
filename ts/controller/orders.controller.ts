import { Request, Response } from 'express';
import { enviarMailEthereal } from '../service/mail';
import model from '../db/index.db'

module.exports = {

  getAllOrders: async (req: Request, res: Response) => {
    const orders: any = await model?.traerOrdenesByUserId(req.params.user_id);
    if (orders.errorType) {
      res.status(400).json({
        message: 'No existen ordenes para ese usuario'
      });
    } else {
      res.status(200).json(orders)
    }
  },
  
  getOne: async (req: Request, res: Response) => {
    const order: any = await model?.traerOrdenesById(req.params.order_id);
    if (order.errorType) {
      res.status(400).json({
        message: `No existe orden con ID: ${req.params.order_id}`
      });
    } else {
      res.status(200).json(order)
    }
  },
  
  completeOrder: async (req: Request, res: Response) => {
    const cart: any = await model?.traerCarrito(req.params.carrito_id);
    if (cart.errorType) {
      res.status(400).json({
        message: `No existe el carrito con ID: ${req.params.carrito_id}`
      });
    } else {
      res.status(200).json(cart)
    }
  },

}