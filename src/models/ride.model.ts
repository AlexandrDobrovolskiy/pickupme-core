import { Schema, Model, model, Document, SchemaType } from 'mongoose';
import { ILocation, ILocationSchemaType} from '../services/location/ILocation';

export interface IRide extends Document {
	driverId: string;
  seats: number;
  price: number;
  departure: ILocation;
  arival: ILocation;
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
	departure: ILocationSchemaType,
  arival: ILocationSchemaType,
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

export const Rides: Model<IRide> = model<IRide>('Ride', RideSchema);
export const RidesHistory: Model<IRide> = model<IRide>('RideHistory', RideSchema);