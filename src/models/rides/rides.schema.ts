import { Schema } from 'mongoose';

import { LocationSchema } from '../location';
import { ContactSchema } from '../contact';

export var RideSchema: Schema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  driverContact: {
    type: ContactSchema,
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
  price: {
    type: Schema.Types.Number,
    required: true
  },
  passengers: {
    type: Schema.Types.Array,
    required: false,
    default: []
  }
});
