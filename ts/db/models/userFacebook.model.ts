import mongoose from 'mongoose';

const userFacebookCollection = 'userFacebook'

const UserFacebookSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    facebookId: { type: String },
    email: {type: String},
    photo: {type: Object},
})

export const userFacebookModel = mongoose.model(userFacebookCollection, UserFacebookSchema)