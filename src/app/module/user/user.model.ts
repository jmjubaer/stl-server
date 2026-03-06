/* eslint-disable no-unused-vars */
import { Model, model, Query, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
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
  if (this?.isDeleted) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User does not exist');
  }

  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(
      this?.password,
      Number(config?.bcrypt_salt_round),
    );
  }
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Exclude deleted user from find query
userSchema.pre(/^find/, function (this: Query<unknown, TUser>) {
  this.where({ isDeleted: { $ne: true } });
});

// Check if user is deleted before update and delete
userSchema.pre(/^findOneAnd/, async function (this: Query<unknown, TUser>) {
  const model = this.model as Model<TUser>;
  const user = await model.findOne(this.getQuery() as Record<string, unknown>);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user?.isDeleted) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User does not exist');
  }
});

export const userModel = model<TUser>('User', userSchema);
