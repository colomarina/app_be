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
    const { orderId } = req.body;
    const orderComplete: any = await model?.traerOrdenesById(orderId);
    if (orderComplete.errorType) {
      res.status(400).json({
        message: `No existe la Orden con ID: ${orderId}`
      });
    } else {
      if (orderComplete.estado !== 'Generada') {
        res.status(400).json({
          message: `No existe la Orden con ID: ${orderId}`
        });
      } else {
        const ordenModificada = await model?.modificarOrden(orderId)
        const datosUsuario: any = await model?.traerUserById(orderComplete.userId)
        const mail = {
          a: datosUsuario.email,
          asunto: 'Orden Completada',
          html: `
          <h1>¡Hola ${datosUsuario.nombreCompleto}!</h1><br>
          <div>
            <h3>Tu orden fue completada con exito!</h3><br>
          </div><br>
          `
        }
        enviarMailEthereal(mail)
        res.status(200).json(ordenModificada)
      }
    }
  },

}