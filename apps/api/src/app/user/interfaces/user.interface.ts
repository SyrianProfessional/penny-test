import { Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  
  token: string;
  loggedInAt: Date;
}
