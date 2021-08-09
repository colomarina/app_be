import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { composeWithMongoose } from 'graphql-compose-mongoose'

const Schema = mongoose.Schema;

export interface UserDoc extends Document {
  email: string,
  password: string,
  nombreCompleto: string,
  celular: string,
  admin: boolean
}

const UserSchema = new Schema<UserDoc>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nombreCompleto: {
    type: String,
    required: true
  },
  celular: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
  }
});

UserSchema.pre<UserDoc>(
  'save',
  async function (next: any) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function (password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);
export const UserTC = composeWithMongoose(UserModel);

module.exports = UserModel;
