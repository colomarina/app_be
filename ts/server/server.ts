import express from "express";
import compression from 'compression';
import mainRouter from "../routes/index";
import session from 'express-session';
import cookieParser from "cookie-parser";
import path = require("path");
import { fechayhora } from "../routes/constantes";
import model from '../db/index.db'
import { inicializarPassport, sessionPassport } from "../config/passport.config";
import { sessionConfig } from "../config/session.config";
import { logger } from "../config/winston.config";
import { sendSMS } from "../service/message";

const cors = require('cors')
const config = require('../config/config')
const app = express();
const http = require("http").Server(app);
export const io = require("socket.io")(http);

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session(sessionConfig))
app.use(inicializarPassport);
app.use(sessionPassport);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use('/', mainRouter)


io.on("connection", (socket: any) => {
  logger.info(`ID: ${socket.id}`);
  model?.traerMensajes()
    .then((mensajes: any) => {
      mensajes.length === 0
        ? logger.info("No hay mensajes en la DB")
        : socket.emit("mensajes", mensajes);
    })
    .catch((error: any) => {
      logger.error(error)
    });
  socket.on("mensaje", (messag: any) => {
    const { mail, nombre, apellido, edad, alias, avatar, message } = messag;
    const mensaje = {
      mail: mail,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
      dateandhour: fechayhora(),
      message: message
    };
    if (message.includes('administrador')) {
      sendSMS(message)
    }
    model?.agregarMensaje(mensaje)
      .then(() => {
        model?.traerMensajes()
          .then((mensajes: any) => {
            mensajes.length === 0
              ? logger.info("No hay mensajes")
              : io.emit("mensajes", mensajes);
          })
          .catch((error: any) => {
            logger.error(error)
          });
      })
      .catch((error: any) => {
        logger.error(error)
      });
  });
});


declare module "express-session" {
  interface Session {
    user: string;
  }
}

const PORT = config.PORT;
const server = http.listen(PORT, () => {
  logger.info(`El servidor se encuentra en el puerto: ${PORT}`)
});
server.on('error', (error: any) => logger.error(`Error en el servidor ${error}`))