import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: { type: String, required: true },
    token: { type: String, default: '' },
    loggedInAt: { type: Date, default: new Date() },

    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index(
  {
    email: 1,
    firstname: 1,
    lastname: 1,
    password: 1,
  },
  {
    unique: false,
  }
);

export { UserSchema };
