import express from "express";
import compression from 'compression';
import mainRouter from "../routes/index";
import session from 'express-session';
import cookieParser from "cookie-parser";
import path = require("path");
import { inicializarPassport, sessionPassport } from "../config/passport.config";
import { sessionConfig } from "../config/session.config";
import { logger } from "../config/winston.config";
import controllerSocket from "../controller/socket.controller";

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
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('pages/index')
})
app.use('/', mainRouter)

io.on('connection', controllerSocket)


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