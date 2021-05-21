import { denormalize, normalize, schema } from "normalizr";
import { MensajeJSON } from "../routes/objetos";

const authors = new schema.Entity('authors')
const mensaje = new schema.Entity('mensajes', {
  author: authors
})

export const normalizar = (mensajes: any) => {
  let arrayMensajes: MensajeJSON[] = [];
  mensajes.forEach((elementos: any) => {
    let men: MensajeJSON = {
      id: elementos._id,
      author: {
        id: elementos.mail,
        nombre: elementos.nombre,
        apellido: elementos.apellido,
        edad: elementos.edad,
        alias: elementos.alias,
        avatar: elementos.avatar
      },
      text: elementos.message
    }
    arrayMensajes.push(men)
  });
  const mensajesNormalizados = normalize(arrayMensajes, [mensaje])
  return mensajesNormalizados
}

export const desnormalizar = (mensajesNormalizados: any) => {
  console.log(mensajesNormalizados.result[0])
  const mensajesDesNormalizados = denormalize(mensajesNormalizados.result[0], [mensaje], mensajesNormalizados.entities)
  console.log(mensajesDesNormalizados)
  
  return mensajesDesNormalizados
}