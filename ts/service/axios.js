const axios = require('axios');

const Parte2 = async () => {
  let arrayConResponses = [];
  /* Loguearse */
  const responseToken = await axios.post('http://localhost:8080/login',{
    email: 'lucas@gmail.com',
    password: 'kira'
  })
  console.log('Login, token:')
  console.log(responseToken.status);
  console.log(responseToken.data.token);
  // arrayConResponses.push(responseToken.data.token)
  /* Crear Producto */
  const responseCrearProducto = await axios.post('http://localhost:8080/api/productos',{
    nombre: 'Tomate que va a ser eliminado despues',
    descripcion: 'Es una verdura',
    codigo: 10,
    foto: 'URL',
    precio: 30,
    stock: 100
  },{
    headers: {
      'Authorization': `Bearer ${responseToken.data.token}`
    }
  })
  console.log('Producto Creado:')
  console.log(responseCrearProducto.status);
  console.log(responseCrearProducto.data)
  /* Crear Producto que lo voy a modificar */
  const responseCrearProductoParaModificar = await axios.post('http://localhost:8080/api/productos',{
    nombre: 'Tomate que va a ser modificado',
    descripcion: 'Es una verdura',
    codigo: 10,
    foto: 'URL',
    precio: 30,
    stock: 100
  },{
    headers: {
      'Authorization': `Bearer ${responseToken.data.token}`
    }
  })
  console.log('Producto Que va a ser Modificado:')
  console.log(responseCrearProductoParaModificar.status);
  console.log(responseCrearProductoParaModificar.data)
  /* Modificar Producto */
  const responseModificarProducto = await axios.put(`http://localhost:8080/api/productos/${responseCrearProductoParaModificar.data._id}`,{
    nombre: 'Tomate Modificado :)',
    descripcion: 'Es un verdura modificada',
    precio: 40,
  },{
    headers: {
      'Authorization': `Bearer ${responseToken.data.token}`
    }
  })
  console.log('Producto Modificado:')
  console.log(responseModificarProducto.status)
  console.log(responseModificarProducto.data)
  /* Eliminar Producto */
  const responseEliminarProducto = await axios.delete(`http://localhost:8080/api/productos/${responseCrearProducto.data._id}`,{
    headers: {
      'Authorization': `Bearer ${responseToken.data.token}`
    }
  })
  console.log('Producto Eliminado:')
  console.log(responseEliminarProducto.status)
  console.log(responseEliminarProducto.data)
  /* Traer Todos los productos */
  const responseProductos = await axios.get('http://localhost:8080/api/productos', {
    headers: {
      'Authorization': `Bearer ${responseToken.data.token}`
    }
  })
  console.log('Todos los Productos:')
  console.log(responseProductos.status)
  console.log(responseProductos.data)
  return arrayConResponses;
}

Parte2()