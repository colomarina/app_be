import mongoose from 'mongoose';

const mensajeCollection = 'mensaje'

const MensajeSchema = new mongoose.Schema({
    mail: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    edad: { type: Number, required: true},
    alias: { type: String, required: true},
    avatar: { type: String, required: true},
    dateandhour: { type: String, required: true},
    message: { type: String, required: true}
})

export const mensajeModel = mongoose.model(mensajeCollection, MensajeSchema)