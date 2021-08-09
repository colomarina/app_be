import mongoose from 'mongoose';

const messageCollection = 'message'

// const MensajeSchema = new mongoose.Schema({
//     mail: { type: String, required: true, max: 50 },
//     nombre: { type: String, required: true},
//     apellido: { type: String, required: true},
//     edad: { type: Number, required: true},
//     alias: { type: String, required: true},
//     avatar: { type: String, required: true},
//     dateandhour: { type: String, required: true},
//     message: { type: String, required: true}
// })

const MessageSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    type: { type: String, required: true},
    message: { type: String, required: true}
})

export const messageModel = mongoose.model(messageCollection, MessageSchema)