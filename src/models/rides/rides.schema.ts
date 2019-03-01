import { Schema, model, Model } from 'mongoose';

import { LocationSchema } from '../location';
import { Ride } from './ride';

export var RideSchema: Schema = new Schema({
  driverId: {
    type: Schema.Types.String,
    required: true
  },
  seats : {
    type: Schema.Types.Number,
    required: true
	},
	departure: LocationSchema,
  arival: LocationSchema,
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
