import mongoose from 'mongoose';

const userCollection = 'user'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true }
})

export const userModel = mongoose.model(userCollection, UserSchema)