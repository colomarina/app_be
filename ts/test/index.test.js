const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect;

let authToken;
let productoAEliminar = [];

describe('Test API Rest-Full', () => {

  before(async () => {
    const responseToken = await request.post('/login').send({
      email: 'kira+123@gmail.com',
      password: 'kira'
    })
    expect(responseToken.status).to.eql(200)
    expect(responseToken.body).to.include.keys('token')
    authToken = `Bearer ${responseToken.body.token}`
  })

  after(() => {
    productoAEliminar.forEach(async (id) => {
      const responseEliminarProducto = await request.delete(`/api/productos/${id}`).set('Authorization', authToken)
      expect(responseEliminarProducto.status).to.eql(200)
    });
  })

  it('Trae todos los productos', async () => {
    const responseProductos = await request.get('/api/productos').set('Authorization', authToken)
    expect(responseProductos.status).to.eql(200)
  })

  it('Agregar Producto', async () => {
    /* Creo el Producto */
    const responseCrearProducto = await request.post('/api/productos').set('Authorization', authToken).send({
      nombre: 'Tomate que va a ser eliminado despues',
      descripcion: 'Es una verdura',
      codigo: 10,
      foto: 'URL',
      precio: 30,
      stock: 100
    })
    expect(responseCrearProducto.status).to.eql(200)
    const productoCreado = responseCrearProducto.body
    expect(productoCreado).to.include.keys('_id', 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock')
    productoAEliminar.push(responseCrearProducto.body._id)
  })

  it('Modificar 1 Producto', async () => {
    /* Creo el Producto */
    const responseCrearProductoAModificar = await request.post('/api/productos').set('Authorization', authToken).send({
      nombre: 'Tomate que va a Modificadodespues',
      descripcion: 'Es una verdura',
      codigo: 10,
      foto: 'URL',
      precio: 30,
      stock: 100
    })
    expect(responseCrearProductoAModificar.status).to.eql(200)
    const productoCreado = responseCrearProductoAModificar.body
    expect(productoCreado).to.include.keys('_id', 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock')
    productoAEliminar.push(responseCrearProductoAModificar.body._id)

    /* Modificar Producto */
    const responseModificarProducto = await request.put(`/api/productos/${responseCrearProductoAModificar.body._id}`).set('Authorization', authToken).send({
      nombre: 'Tomate Modificado :)',
      descripcion: 'Es un verdura modificada',
      precio: 40,
    })
    expect(responseModificarProducto.status).to.eql(200)
    const productoModificado = responseModificarProducto.body
    expect(productoModificado).to.include.keys('_id', 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock')
  })
})