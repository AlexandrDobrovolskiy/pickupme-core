import { Schema } from 'mongoose';

import { LocationSchema } from '../location';

export var SearchSubscriptionSchema: Schema = new Schema({
  subscriberId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  seats : {
    type: Schema.Types.Number,
    required: true
	},
	departure: {
    type: LocationSchema,
    required: true,
  },
  arrival: {
    type: LocationSchema,
    required: true,
  },
  canceled: {
    type: Schema.Types.Boolean,
    required: false,
    default: false,
  },
});
