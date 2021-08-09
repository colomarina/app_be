import { Request, Response } from 'express';
import { mensaje_error, usuario } from "../routes/constantes";
import { logger } from '../config/winston.config';
import model from '../db/index.db'

module.exports = {

  getAll: async (req: Request, res: Response) => {
    if (req.params.category) {
      const productos = await model?.traerProductosPorCategoria(req.params.category);
      if (productos) {
        res.json(productos)
      } else {
        res.sendStatus(400);
      }
    } else {
      const productos = await model?.traerProductos()
      if (productos) {
        res.json(productos)
      } else {
        res.sendStatus(400);
      }
    }
  },

  create: async (req: Request, res: Response) => {
    //Agregar un producto al listado
    if (usuario.administrador) {
      if (
        req.body.nombre === undefined ||
        req.body.descripcion === undefined ||
        req.body.categoria === undefined ||
        req.body.precio === undefined ||
        req.body.stock === undefined ||
        req.body.foto === undefined
      ) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Debe rellenar todos los campos...";
        // logger.error(mensaje_error)
        res.sendStatus(400);
      } else {
        const productoCreado = await model?.agregarProducto(req.body)
        if (productoCreado) {
          res.sendStatus(201)
        } else {
          //Hubo error al actualizar el Producto
          res.sendStatus(400)
        }
      }
    } else {
      // Acceso denegado , Se necesita rol Administrador
      res.sendStatus(403);
    }
  },

  update: async (req: Request, res: Response) => {
    // Actualiza un producto por su id
    if (usuario.administrador) {
      const id = req.params.producto_id;
      const update = req.body;
      const producto: any = await model?.actualizarProducto(id, update)
      try {
        const productoActualizado = await model?.traerProducto(producto.id)
        if (productoActualizado) {
          res.sendStatus(200)
        } else {
          //Hubo error al actualizar el Producto
          res.sendStatus(400)
        }
      } catch (error: any) {
        mensaje_error.error = `Error en el ${error.path}`;
        mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.sendStatus(400);
      }
    } else {
      // Acceso denegado , Se necesita rol Administrador
      res.sendStatus(403);
    }
  },

  delete: async (req: Request, res: Response) => {
    // Elimina un producto por su id
    if (usuario.administrador) {
      const productoEliminado = await model?.eliminarProducto(req.params.producto_id);
      if (productoEliminado) {
        res.sendStatus(200)
      } else {
        //Hubo error al eliminar el Producto
        res.sendStatus(400)
      }
    } else {
      // Acceso denegado , Se necesita rol Administrador
      res.sendStatus(403);
    }

  }
}