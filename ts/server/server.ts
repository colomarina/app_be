import express from "express";
import compression from 'compression';
import routerProductos from "../routes/productos.routes";
import routerSession from "../routes/session.routes";
import routerForExercise from "../routes/forExercise.routes";
import session from 'express-session';
import cookieParser from "cookie-parser";
import path = require("path");
import { fechayhora } from "../routes/constantes";
import { agregarMensaje, connect, traerMensajes } from "../db/index.db";
import { inicializarPassport, sessionPassport } from "../config/passport.config";
import { sessionConfig } from "../config/session.config";
import { logger } from "../config/winston.config";

const app = express();
const http = require("http").Server(app);
export const io = require("socket.io")(http);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session(sessionConfig))
app.use(inicializarPassport);
app.use(sessionPassport);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/api", routerProductos);
app.use("/exercise", routerForExercise);
app.use("/", routerSession);

io.on("connection", (socket: any) => {
  logger.info(`ID: ${socket.id}`);
  traerMensajes()
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
      message: message};
    agregarMensaje(mensaje)
      .then(() => {
        traerMensajes()
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

// const port = process.argv[2] || 8080;
const PORT =  process.env.PORT || 8080;
const server = http.listen(PORT, () => {
  connect()
        .then(() => {
          logger.info(`El servidor se encuentra en el puerto: ${PORT} y se conecto correctamente a MongoAtlas DB ecommerce`)
        })
        .catch((err) => logger.error(err));
});
