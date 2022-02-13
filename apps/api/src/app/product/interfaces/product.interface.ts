import { Document } from 'mongoose';
import { IUser } from '../../user/interfaces/user.interface';

export interface IProduct extends Document {
  title: string;
  description: string;
  user :  IUser
}
