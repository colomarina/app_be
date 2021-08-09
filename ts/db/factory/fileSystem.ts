import fs from 'fs';

export default class peristenciaFileSystem {
  constructor() {
    ; (async () => {
      try {
        await fs.promises.readFile('datos.txt')
      } catch {
        await fs.promises.writeFile('datos.txt', JSON.stringify([]))
      }
    })()
  }
  /* PRODUCTOS */
  traerProductos = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerProductosPorCategoria = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerProducto = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  agregarProducto = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  actualizarProducto = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  eliminarProducto = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerProductosXNombres = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerProductosXRangoPrecios = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  hasStock = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  /* MENSAJES */
  traerMensajes = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  agregarMensaje = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  /* PASSWORD HASH*/
  createHash = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  isValidPassword = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  /* USER */
  updateUser = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerUser = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerUserById = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  /* CARRITO */
  crearCarrito = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  agregarProductoEnCarrito = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  eliminarProductoEnCarrito = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerCarrito = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  vaciarProductosDelCarrito = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }

  /* ORDENES */

  crearOrden = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerOrdenesByUserId = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  traerOrdenesById = async () => {
    let datos = await fs.promises.readFile('datos.txt')
    return datos
  }
  // crearOrden = async () => {
  //   let datos = await fs.promises.readFile('datos.txt')
  //   return datos
  // }

}