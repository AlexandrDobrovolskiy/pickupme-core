import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
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