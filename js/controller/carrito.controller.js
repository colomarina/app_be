"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_db_1 = require("../db/index.db");
const constantes_1 = require("../routes/constantes");
const winston_config_1 = require("../config/winston.config");
const mail_1 = require("../service/mail");
const message_1 = require("../service/message");
module.exports = {
    getOne: (req, res) => {
        index_db_1.traerCarrito(req.params.carrito_id)
            .then((datos) => {
            res.json(datos);
        })
            .catch((error) => {
            winston_config_1.logger.error(error);
            res.send(error);
        });
    },
    create: (req, res) => {
        //Crea 1 carrito
        index_db_1.crearCarrito(req.body)
            .then((data) => {
            res.sendStatus(201);
        })
            .catch((error) => {
            constantes_1.mensaje_error.error = `Error en el ${error.path}`;
            constantes_1.mensaje_error.descripcion = `Carrito ${error.value} no fue encontrado`;
            winston_config_1.logger.error(constantes_1.mensaje_error);
            res.json(constantes_1.mensaje_error);
        });
    },
    update: (req, res) => {
        // Agrega un producto al carrito por su id
        if (constantes_1.usuario.administrador) {
            const idCarrito = req.params.carrito_id;
            const producto = req.body;
            index_db_1.agregarProductoEnCarrito(idCarrito, producto)
                .then((data) => {
                res.sendStatus(200);
            })
                .catch((error) => {
                constantes_1.mensaje_error.error = error.errno;
                constantes_1.mensaje_error.descripcion = "Carrito no encontrado";
                winston_config_1.logger.error(error);
                res.json(constantes_1.mensaje_error);
            });
        }
        else {
            constantes_1.mensaje_error.error = "1";
            constantes_1.mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
            winston_config_1.logger.error(constantes_1.mensaje_error);
            res.json(constantes_1.mensaje_error);
        }
    },
    finishBuying: (req, res) => {
        const idCarrito = req.body.carrito_id;
        index_db_1.traerCarrito(idCarrito)
            .then((carrito) => __awaiter(void 0, void 0, void 0, function* () {
            index_db_1.traerUser(carrito.usuario)
                .then((user) => {
                let template = '<h1>Tu Pedido:</h1><br>';
                carrito.productos.forEach((producto) => {
                    template += `
                <p>Producto: ${producto._id}</p><br>
                <p>Nombre: ${producto.nombre}</p><br>
                <p>Precio: ${producto.precio}</p><br>
              `;
                });
                const asunto = `nuevo pedido de ${user.nombreCompleto} y ${user.email}`;
                mail_1.enviarMailEthereal({
                    a: 'natalia.fahey35@ethereal.email',
                    asunto,
                    html: template
                });
                message_1.sendWhatsApp({
                    para: '+5492216408251',
                    mensaje: asunto
                });
                message_1.sendSMS({
                    mensaje: "Su pedido ha sido recibido y se encuentra en proceso",
                    para: '+542216408251'
                });
                res.json(template);
            })
                .catch((error) => {
                winston_config_1.logger.error(error);
            });
        }))
            .catch((error) => {
            constantes_1.mensaje_error.error = error.errno;
            constantes_1.mensaje_error.descripcion = "Carrito no encontrado";
            winston_config_1.logger.error(error);
            res.json(constantes_1.mensaje_error);
        });
    }
};
