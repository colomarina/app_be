import mongoose from 'mongoose';

const messageCollection = 'message'

const MessageSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    type: { type: String, required: true},
    message: { type: String, required: true}
})

export const messageModel = mongoose.model(messageCollection, MessageSchema)