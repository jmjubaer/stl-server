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
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
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
  // todo: findone hook for isdelete
// Todo: complete this
// userSchema.pre("findOneAndUpdate", async function (next) {
//   const query = this.getQuery()
//   const isUserExist = await userModel.findOne(query)
//   if(isUserExist){
//     throw new AppError()
//   }
// })

export const userModel = model<TUser>('User', userSchema);
