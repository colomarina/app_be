// PRODUCTOS 
export type ProductoType = {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  foto: string;
}
// MENSAJES
export type MessageType = {
  userId: string,
  type: 'Usuario' | 'Sistema' | string,
  message: string,
}
// RESPUESTAS
export type ResponseObjectOrErrorType = {
  
}