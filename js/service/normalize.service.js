"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desnormalizar = exports.normalizar = void 0;
const normalizr_1 = require("normalizr");
const authors = new normalizr_1.schema.Entity('authors');
const mensaje = new normalizr_1.schema.Entity('mensajes', {
    author: authors
});
const normalizar = (mensajes) => {
    let arrayMensajes = [];
    mensajes.forEach((elementos) => {
        let men = {
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
        };
        arrayMensajes.push(men);
    });
    const mensajesNormalizados = normalizr_1.normalize(arrayMensajes, [mensaje]);
    return mensajesNormalizados;
};
exports.normalizar = normalizar;
const desnormalizar = (mensajesNormalizados) => {
    console.log(mensajesNormalizados.result[0]);
    const mensajesDesNormalizados = normalizr_1.denormalize(mensajesNormalizados.result[0], [mensaje], mensajesNormalizados.entities);
    console.log(mensajesDesNormalizados);
    return mensajesDesNormalizados;
};
exports.desnormalizar = desnormalizar;
