"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_db_1 = require("../db/index.db");
const constantes_1 = require("../routes/constantes");
const faker_1 = __importDefault(require("faker"));
const normalize_service_1 = require("../service/normalize.service");
const normalizr_1 = require("normalizr");
const winston_config_1 = require("../config/winston.config");
const authors = new normalizr_1.schema.Entity('authors');
const mensaje = new normalizr_1.schema.Entity('mensajes', {
    author: authors
});
module.exports = {
    getAllFront: (req, res) => {
        index_db_1.traerProductos().then(() => {
            const { username } = req.user;
            res.render('pages/index', {
                nombreUsuario: username.toUpperCase(),
                fotoUsuario: undefined,
                emailUsuario: undefined,
            });
        })
            .catch((error) => {
            winston_config_1.logger.error(error);
            res.send(error);
        });
    },
    getAll: (req, res) => {
        index_db_1.traerProductos()
            .then((datos) => {
            res.json(datos);
        })
            .catch((error) => {
            winston_config_1.logger.error(error);
            res.send(error);
        });
    },
    getAllMensajes: (req, res) => {
        index_db_1.traerMensajes()
            .then((mensajes) => {
            const mensajesNormalizados = normalize_service_1.normalizar(mensajes);
            const mensajesDesNormalizados = normalizr_1.denormalize(mensajesNormalizados.result, [mensaje], mensajesNormalizados.entities);
            res.json(mensajesNormalizados);
        });
    },
    getOne: (req, res) => {
        // Listar 1 producto x su id
        index_db_1.traerProducto(req.params.producto_id)
            .then((producto) => {
            (producto !== null) ? res.json(producto) : res.json({ Error: 'Producto inexistente' });
        })
            .catch((error) => {
            constantes_1.mensaje_error.error = `Error en el ${error.path}`;
            constantes_1.mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
            winston_config_1.logger.error(error);
            res.json(constantes_1.mensaje_error);
        });
    },
    getWithFilters: (req, res) => {
        if (req.query.nombre !== undefined) {
            if (req.query.nombre !== '') {
                index_db_1.traerProductosXNombres(req.query.nombre)
                    .then((productos) => {
                    res.send(productos);
                })
                    .catch((error) => {
                    winston_config_1.logger.error(error);
                    res.send(error);
                });
            }
            else {
                constantes_1.mensaje_error.error = `Error en el filtro`;
                constantes_1.mensaje_error.descripcion = `El filtro tiene ciertas inconsistencias`;
                winston_config_1.logger.error(constantes_1.mensaje_error);
                res.json(constantes_1.mensaje_error);
            }
        }
        else if ((req.query.min_precio !== undefined) && (req.query.max_precio !== undefined)) {
            if ((req.query.min_precio !== '') && (req.query.max_precio !== '')) {
                index_db_1.traerProductosXRangoPrecios(req.query.min_precio, req.query.max_precio)
                    .then((productos) => {
                    res.send(productos);
                })
                    .catch((error) => {
                    winston_config_1.logger.error(error);
                    res.send(error);
                });
            }
            else {
                constantes_1.mensaje_error.error = `Error en los filtros`;
                constantes_1.mensaje_error.descripcion = `Los filtros tienen ciertas inconsistencias`;
                winston_config_1.logger.error(constantes_1.mensaje_error);
                res.json(constantes_1.mensaje_error);
            }
        }
    },
    create: (req, res) => {
        //Agregar un producto al listado
        if (constantes_1.usuario.administrador) {
            if (req.body.nombre === undefined ||
                req.body.descripcion === undefined ||
                req.body.codigo === undefined ||
                req.body.foto === undefined ||
                req.body.precio === undefined ||
                req.body.stock === undefined) {
                constantes_1.mensaje_error.error = "1";
                constantes_1.mensaje_error.descripcion = "Debe rellenar todos los campos...";
                winston_config_1.logger.error(constantes_1.mensaje_error);
                res.json(constantes_1.mensaje_error);
            }
            else {
                index_db_1.agregarProducto(req.body)
                    .then(() => {
                    res.sendStatus(201);
                })
                    .catch((error) => {
                    constantes_1.mensaje_error.error = `Error en el ${error.path}`;
                    constantes_1.mensaje_error.descripcion = `Producto ${error.value} no fue encontrado`;
                    winston_config_1.logger.error(constantes_1.mensaje_error);
                    res.json(constantes_1.mensaje_error);
                });
            }
        }
        else {
            constantes_1.mensaje_error.error = "403";
            constantes_1.mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
            winston_config_1.logger.error(constantes_1.mensaje_error);
            res.json(constantes_1.mensaje_error);
        }
    },
    createRandom: (req, res) => {
        let p = [];
        let cantidad;
        if (req.query.cant === '0') {
            constantes_1.mensaje_error.error = "Error en la cantidad";
            constantes_1.mensaje_error.descripcion = "No hay productos";
            winston_config_1.logger.error(constantes_1.mensaje_error);
            res.json(constantes_1.mensaje_error);
        }
        else {
            (req.query.cant === '') ? cantidad = 10 : cantidad = req.query.cant;
            for (let index = 0; index < cantidad; index++) {
                let prod = {
                    nombre: faker_1.default.commerce.productName(),
                    descripcion: faker_1.default.commerce.productDescription(),
                    codigo: index + 1,
                    foto: faker_1.default.image.imageUrl(),
                    precio: +faker_1.default.commerce.price(),
                    stock: 100
                };
                p.push(prod);
            }
            res.json(p);
        }
    },
    update: (req, res) => {
        // Actualiza un producto por su id
        if (constantes_1.usuario.administrador) {
            const id = req.params.producto_id;
            const update = req.body;
            index_db_1.actualizarProducto(id, update)
                .then((data) => {
                index_db_1.traerProducto(id)
                    .then((producto) => {
                    (producto !== null) ? res.send(producto) : res.json({ Error: 'Producto inexistente' });
                })
                    .catch((error) => {
                    constantes_1.mensaje_error.error = `Error en el ${error.path}`;
                    constantes_1.mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
                    winston_config_1.logger.error(constantes_1.mensaje_error);
                    res.json(constantes_1.mensaje_error);
                });
            })
                .catch((error) => {
                constantes_1.mensaje_error.error = error.errno;
                constantes_1.mensaje_error.descripcion = "Producto no encontrado";
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
    delete: (req, res) => {
        // Elimina un producto por su id
        if (constantes_1.usuario.administrador) {
            index_db_1.eliminarProducto(req.params.producto_id)
                .then((producto) => {
                (producto !== null) ? res.send(producto) : res.json({ Error: 'No se pudo eliminar el producto (Producto no encontrado)' });
            })
                .catch((error) => {
                constantes_1.mensaje_error.error = `Error en el ${error.path}`;
                constantes_1.mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
                winston_config_1.logger.error(error);
                res.json(constantes_1.mensaje_error);
            });
        }
        else {
            constantes_1.mensaje_error.error = "403";
            constantes_1.mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
            winston_config_1.logger.error(constantes_1.mensaje_error);
            res.json(constantes_1.mensaje_error);
        }
    }
};
