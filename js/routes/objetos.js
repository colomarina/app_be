"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = exports.Mensaje = exports.Errores = exports.Carrito = exports.Productos = exports.Producto = void 0;
class Producto {
    constructor(nuevoId, nuevoNombre, nuevoDescripcion, nuevoCodigo, nuevoFoto, nuevoPrecio, nuevoStock) {
        this.id = nuevoId;
        this.timestamp = Date.now();
        this.nombre = nuevoNombre;
        this.descripcion = nuevoDescripcion;
        this.codigo = nuevoCodigo;
        this.foto = nuevoFoto;
        this.precio = nuevoPrecio;
        this.stock = nuevoStock;
    }
}
exports.Producto = Producto;
class Productos {
    constructor() {
        this.productos = [];
    }
    listar() {
        return this.productos;
    }
    buscar(id) {
        return this.productos.find(produ => produ.id === id);
    }
    agregar(nuevoProducto) {
        return this.productos.push(nuevoProducto);
    }
    actualizar(productoActualizar) {
        this.productos.map(produ => {
            if (produ.id === productoActualizar.id) {
                (productoActualizar.nombre !== undefined) ? produ.nombre = productoActualizar.nombre : produ.nombre = produ.nombre;
                (productoActualizar.descripcion !== undefined) ? produ.descripcion = productoActualizar.descripcion : produ.descripcion = produ.descripcion;
                (productoActualizar.codigo !== undefined) ? produ.codigo = productoActualizar.codigo : produ.codigo = produ.codigo;
                (productoActualizar.foto !== undefined) ? produ.foto = productoActualizar.foto : produ.foto = produ.foto;
                (productoActualizar.stock !== undefined) ? produ.stock = productoActualizar.stock : produ.stock = produ.stock;
            }
        });
        return productoActualizar;
    }
    eliminar(id) {
        this.productos = this.productos.filter(produ => produ.id !== id);
        return this.productos;
    }
}
exports.Productos = Productos;
class Carrito {
    constructor(nuevoId, nuevoProductos) {
        this.id = nuevoId;
        this.timestap = Date.now();
        this.productos = nuevoProductos;
    }
    listar_productos() {
        return this.productos;
    }
    agregar_producto(nuevoProducto) {
        return this.productos.agregar(nuevoProducto);
    }
    eliminar_producto(id) {
        return this.productos.eliminar(id);
    }
}
exports.Carrito = Carrito;
class Errores {
    constructor(error, descripcion) {
        this.error = error;
        this.descripcion = descripcion;
    }
}
exports.Errores = Errores;
class Mensaje {
    constructor(nuevoMail, nuevoNombre, nuevoApellido, nuevoEdad, nuevoAlias, nuevoAvatar, nuevoDateandhour, nuevoMessage) {
        this.mail = nuevoMail;
        this.nombre = nuevoNombre;
        this.apellido = nuevoApellido;
        this.edad = nuevoEdad;
        this.alias = nuevoAlias;
        this.avatar = nuevoAvatar;
        this.dateandhour = nuevoDateandhour;
        this.message = nuevoMessage;
    }
}
exports.Mensaje = Mensaje;
class Usuario {
    constructor(valor) {
        this.administrador = valor;
    }
}
exports.Usuario = Usuario;
