import { Schema } from 'mongoose';
import { UserSettingsSchema } from 'models/user-settings/user-settings.schema';

const AuthenticationSchema: Schema = new Schema({
  firebase: {
    type: Schema.Types.String,
    required: false,
    default: '',
  }
});

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
  authentication: {
    type: AuthenticationSchema,
    required: false,
  },
  settings: {
    type: UserSettingsSchema,
    required: false,
  }
});