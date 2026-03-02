import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config?.bcrypt_salt_round),
  );
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const userModel = model<TUser>('User', userSchema);
