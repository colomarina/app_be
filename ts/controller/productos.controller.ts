import { Request, Response } from 'express';
import { actualizarProducto, agregarProducto, eliminarProducto, traerMensajes, traerProducto, traerProductos, traerProductosXNombres, traerProductosXRangoPrecios } from "../db/index.db";
import { mensaje_error, usuario } from "../routes/constantes";
import faker from 'faker';
import { normalizar } from "../service/normalize.service";
import { denormalize, schema } from "normalizr";
import { logger } from '../config/winston.config';

const authors = new schema.Entity('authors')
const mensaje = new schema.Entity('mensajes', {
  author: authors
})

module.exports = {

  getAllFront: (req: Request, res: Response) => {
    traerProductos().then(() => {
      const { username }: any = req.user;
      res.render('pages/index', {
        nombreUsuario: username.toUpperCase(),
        fotoUsuario: undefined,
        emailUsuario: undefined,
      })
    })
      .catch((error) => {
        logger.error(error)
        res.send(error);
      });
  },

  getAll: (req: Request, res: Response) => {
    traerProductos()
      .then((datos) => {
        res.json(datos)
      })
      .catch((error) => {
        logger.error(error)
        res.send(error);
      });
  },


  getAllMensajes: (req: Request, res: Response) => {
    traerMensajes()
      .then((mensajes: any) => {
        const mensajesNormalizados = normalizar(mensajes)
        const mensajesDesNormalizados = denormalize(mensajesNormalizados.result, [mensaje], mensajesNormalizados.entities)
        res.json(mensajesNormalizados)
      })
  },

  getOne: (req: Request, res: Response) => {
    // Listar 1 producto x su id
    traerProducto(req.params.producto_id)
      .then((producto: String) => {
        (producto !== null) ? res.json(producto) : res.json({ Error: 'Producto inexistente' });
      })
      .catch((error: any) => {
        mensaje_error.error = `Error en el ${error.path}`;
        mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
        logger.error(error)
        res.json(mensaje_error);
      });
  },

  getWithFilters: (req: Request, res: Response) => {
    if (req.query.nombre !== undefined) {
      if (req.query.nombre !== '') {
        traerProductosXNombres(req.query.nombre)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error) => {
            logger.error(error)
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en el filtro`;
        mensaje_error.descripcion = `El filtro tiene ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      }
    }
    else if ((req.query.min_precio !== undefined) && (req.query.max_precio !== undefined)) {
      if ((req.query.min_precio !== '') && (req.query.max_precio !== '')) {
        traerProductosXRangoPrecios(req.query.min_precio, req.query.max_precio)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error) => {
            logger.error(error)
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en los filtros`;
        mensaje_error.descripcion = `Los filtros tienen ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      }
    }
  },

  create: (req: Request, res: Response) => {
    //Agregar un producto al listado
    if (usuario.administrador) {
      if (
        req.body.nombre === undefined ||
        req.body.descripcion === undefined ||
        req.body.codigo === undefined ||
        req.body.foto === undefined ||
        req.body.precio === undefined ||
        req.body.stock === undefined
      ) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Debe rellenar todos los campos...";
        logger.error(mensaje_error)
        res.json(mensaje_error);
      } else {
        agregarProducto(req.body)
          .then(() => {
            res.sendStatus(201)
          })
          .catch((error: any) => {
            mensaje_error.error = `Error en el ${error.path}`;
            mensaje_error.descripcion = `Producto ${error.value} no fue encontrado`;
            logger.error(mensaje_error)
            res.json(mensaje_error);
          });
      }
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }
  },
  createRandom: (req: Request, res: Response) => {

    let p = []
    let cantidad: any;
    if (req.query.cant === '0') {
      mensaje_error.error = "Error en la cantidad";
      mensaje_error.descripcion = "No hay productos";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    } else {
      (req.query.cant === '') ? cantidad = 10 : cantidad = req.query.cant;
      for (let index = 0; index < cantidad; index++) {
        let prod = {
          nombre: faker.commerce.productName(),
          descripcion: faker.commerce.productDescription(),
          codigo: index + 1,
          foto: faker.image.imageUrl(),
          precio: +faker.commerce.price(),
          stock: 100
        }
        p.push(prod)
      }
      res.json(p)
    }
  },

  update: (req: Request, res: Response) => {
    // Actualiza un producto por su id
    if (usuario.administrador) {
      const id = req.params.producto_id;
      const update = req.body;
      actualizarProducto(id, update)
        .then((data) => {
          traerProducto(id)
            .then((producto: String) => {
              (producto !== null) ? res.send(producto) : res.json({ Error: 'Producto inexistente' });
            })
            .catch((error: any) => {
              mensaje_error.error = `Error en el ${error.path}`;
              mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
              logger.error(mensaje_error)
              res.json(mensaje_error);
            });
        })
        .catch((error: any) => {
          mensaje_error.error = error.errno;
          mensaje_error.descripcion = "Producto no encontrado";
          logger.error(error)
          res.json(mensaje_error);
        });

    } else {
      mensaje_error.error = "1";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }
  },

  delete: (req: Request, res: Response) => {
    // Elimina un producto por su id
    if (usuario.administrador) {
      eliminarProducto(req.params.producto_id)
        .then((producto: any) => {
          (producto !== null) ? res.send(producto) : res.json({ Error: 'No se pudo eliminar el producto (Producto no encontrado)' });
        })
        .catch((error: any) => {
          mensaje_error.error = `Error en el ${error.path}`;
          mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
          logger.error(error)
          res.json(mensaje_error);
        });
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }

  }
}