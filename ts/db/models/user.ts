import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export interface UserDoc extends Document {
  email: string,
  password: string
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
  },
  direccion: {
    type: String
  },
  edad: {
    type: Number,
  },
  celular: {
    type: String,
  },
  foto: {
    type: String
  },
});

UserSchema.pre<UserDoc>(
  'save',
  async function(next: any) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;