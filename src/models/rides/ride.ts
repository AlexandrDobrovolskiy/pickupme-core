import { Document } from 'mongoose';
import { Location } from '../location';

export interface Ride extends Document {
  driverId: string;
  seats: number;
  price: number;
  departure: Location;
  arival: Location;
  passengers: Array<string>;
}