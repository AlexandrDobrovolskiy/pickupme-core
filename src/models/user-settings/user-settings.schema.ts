import { Schema } from 'mongoose';
import UserSettings from './UserSettings';

export var UserSettingsSchema: Schema<UserSettings> = new Schema<UserSettings>({
  arrivalSearchRadius: {
    type: Schema.Types.Number,
    required: false,
    default: 1,
  },
  departureSearchRadius: {
    type: Schema.Types.Number,
    required: false,
    default: 1.5,
  },
});
