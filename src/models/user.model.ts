import { Schema, Model, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
	phone: string;
	telegramId: string;
	token: string;
}

export var UserSchema: Schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  phone : {
    type: Schema.Types.String,
    required: true
	},
	telegramId: {
    type: Schema.Types.String,
		required: false,
		default: ''
  },
  token : {
    type: Schema.Types.String,
    required: true
  }
});

export const Users: Model<IUser> = model<IUser>('User', UserSchema);