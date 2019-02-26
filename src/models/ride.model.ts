import { Schema, Model, model, Document } from 'mongoose';
import IRidePoint from 'services/rides/IRidePoint';

export interface IRide extends Document {
	driverId: string;
  seats: number;
  price: number;
  departure: IRidePoint;
  arival: IRidePoint;
  passengers: Array<string>;
}

export var RideSchema: Schema = new Schema({
  driverId: {
    type: Schema.Types.String,
    required: true
  },
  seats : {
    type: Schema.Types.Number,
    required: true
	},
	departure: {
    type: Schema.Types.ObjectId,
		required: false,
  },
  arival : {
    type: Schema.Types.ObjectId,
    required: true
  },
  passengers: {
    type: Schema.Types.Array,
    required: false,
    default: []
  }
});

export const Rides: Model<IRide> = model<IRide>('Ride', RideSchema);