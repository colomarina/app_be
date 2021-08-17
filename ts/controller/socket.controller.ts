import model from '../db/index.db'
import { Socket } from "socket.io";
import { io } from "../server/server";
import { MessageType } from "../types/types";

const controllerSocket = (socket: Socket) => {
  console.log('Usuario conectado')
  /* Escuchando Mensajes del Cliente */
  socket.on('messageToServer', async (objectMessage: MessageType) => {
    const { userId, message } = objectMessage;
    const user: any = await model?.traerUserById(userId);
    if (user.errorType) {
      io.emit('messageErrorToClient', user)
    } else {
      const mensaje = {
        userId,
        type: 'Usuario',
        message
      }
      const mensajeAgregado = await model?.agregarMensaje(mensaje);
      if (mensajeAgregado) {
        let mensajeServer = '';
        if (message.toLowerCase().includes('stock')) {
          const productos: any = await model?.traerProductos();
          const stock = productos?.map((p: any) => {
            return {
              nombre: p.nombre,
              stock: p.stock
            }
          })
          mensajeServer = JSON.stringify(stock);
        } else if (message.toLowerCase().includes('orden')) {
          const ultimaOrden: any = await model?.traerUltimaOrdenByUserId(userId);
          mensajeServer = JSON.stringify(ultimaOrden);
        } else if (message.toLowerCase().includes('carrito')) {
          const datosCarrito: any = await model?.traerCarritoByUserId(userId);
          mensajeServer = JSON.stringify(datosCarrito);
        } else {
          mensajeServer = 'Mensaje predeterminado';
        }
        const mensajeFromServer = {
          userId,
          type: 'Sistema',
          message: mensajeServer
        }
        const mensajeAgregadoFromServer = await model?.agregarMensaje(mensajeFromServer);
        if (mensajeAgregadoFromServer) {
          const mensajesDe = await model?.traerMensajesDe(userId)
          io.emit('messageToClient', mensajesDe)
        }
      }
    }
  })
}

export default controllerSocket;