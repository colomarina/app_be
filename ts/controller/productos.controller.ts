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
        res.status(400).json({
        message: `Hubo un error en base`
      });
      }
    } else {
      const productos = await model?.traerProductos()
      if (productos) {
        res.json(productos)
      } else {
        res.status(400).json({
        message: `Hubo un error en base`
      });
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
        res.status(400).json({
          message: "Hay inconsistencias en el Producto",
        });
      } else {
        const productoCreado = await model?.agregarProducto(req.body)
        if (productoCreado) {
          res.sendStatus(201)
        } else {
          res.status(403).json({
            message: "Hubo error al crear el Producto",
          });
        }
      }
    } else {
      res.status(403).json({
        message: "Acceso denegado , Se necesita rol Administrador",
      });
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
          res.status(400).json({
            message: "Hubo error al actualizar el Producto",
          });
        }
      } catch (error: any) {
        res.status(400).json({
          message: "Hay ciertas inconsistencias en el producto a actualizar",
        });
      }
    } else {
      res.status(403).json({
        message: "Acceso denegado , Se necesita rol Administrador",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    // Elimina un producto por su id
    if (usuario.administrador) {
      const productoEliminado = await model?.eliminarProducto(req.params.producto_id);
      if (productoEliminado) {
        res.sendStatus(200)
      } else {
        res.status(400).json({
          message: "No se pudo eliminar el producto",
        });
      }
    } else {
      res.status(403).json({
        message: "Acceso denegado , Se necesita rol Administrador",
      });
    }

  }
}