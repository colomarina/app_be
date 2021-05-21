"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const productos_routes_1 = __importDefault(require("../routes/productos.routes"));
const session_routes_1 = __importDefault(require("../routes/session.routes"));
const forExercise_routes_1 = __importDefault(require("../routes/forExercise.routes"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path = require("path");
const constantes_1 = require("../routes/constantes");
const index_db_1 = require("../db/index.db");
const passport_config_1 = require("../config/passport.config");
const session_config_1 = require("../config/session.config");
const winston_config_1 = require("../config/winston.config");
const app = express_1.default();
const http = require("http").Server(app);
exports.io = require("socket.io")(http);
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default(session_config_1.sessionConfig));
app.use(passport_config_1.inicializarPassport);
app.use(passport_config_1.sessionPassport);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/api", productos_routes_1.default);
app.use("/exercise", forExercise_routes_1.default);
app.use("/", session_routes_1.default);
exports.io.on("connection", (socket) => {
    winston_config_1.logger.info(`ID: ${socket.id}`);
    index_db_1.traerMensajes()
        .then((mensajes) => {
        mensajes.length === 0
            ? winston_config_1.logger.info("No hay mensajes en la DB")
            : socket.emit("mensajes", mensajes);
    })
        .catch((error) => {
        winston_config_1.logger.error(error);
    });
    socket.on("mensaje", (messag) => {
        const { mail, nombre, apellido, edad, alias, avatar, message } = messag;
        const mensaje = {
            mail: mail,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar,
            dateandhour: constantes_1.fechayhora(),
            message: message
        };
        index_db_1.agregarMensaje(mensaje)
            .then(() => {
            index_db_1.traerMensajes()
                .then((mensajes) => {
                mensajes.length === 0
                    ? winston_config_1.logger.info("No hay mensajes")
                    : exports.io.emit("mensajes", mensajes);
            })
                .catch((error) => {
                winston_config_1.logger.error(error);
            });
        })
            .catch((error) => {
            winston_config_1.logger.error(error);
        });
    });
});
const port = process.argv[2] || 8080;
const server = http.listen(port, () => {
    index_db_1.connect()
        .then(() => {
        winston_config_1.logger.info(`El servidor se encuentra en el puerto: ${port} y se conecto correctamente a MongoAtlas DB ecommerce`);
    })
        .catch((err) => winston_config_1.logger.error(err));
});
