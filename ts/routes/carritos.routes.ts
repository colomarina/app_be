import { Router } from "express";
import { carrito, listaProductos, mensaje_error } from "../routes/constantes";
let routerCarritos = Router();

// Rutas para Carritos
// console.log(carrito)

routerCarritos.get('/carritos/:carrito_id', (req,res)=>{
    // Listar 1 carrito
    if (carrito.listar_productos().listar().length === 0) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "No hay productos cargados";
        res.json(mensaje_error)
    }
    res.json(carrito.listar_productos())
})

routerCarritos.post('/carritos/:producto_id', (req,res)=>{
    // Agregar 1 producto a la lista de productos
    const productoAgregar = listaProductos.buscar(req.params.producto_id)
    if (!productoAgregar) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Producto no encontrado en el carrito";
        res.json(mensaje_error)
    } else {
        carrito.agregar_producto(productoAgregar)
        res.json(carrito)
    }
})

routerCarritos.delete('/carritos/:producto_id', (req,res)=>{
    // Eliminar un producto del carrito
    const produ_eliminar = listaProductos.buscar(req.params.producto_id)
    if (!produ_eliminar) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Producto no encontrado en el carrito, no se puede eliminar";
        res.json(mensaje_error)
    }
    carrito.eliminar_producto(req.params.producto_id)
    res.json(produ_eliminar)
})

export default routerCarritos ;