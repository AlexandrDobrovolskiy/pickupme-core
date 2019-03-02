import { Document } from 'mongoose';
import { Location } from '../location';

export interface Ride extends Document {
  driverId: string;
  seats: number;
  price: number;
  date: Date;
  departure: Location;
  arrival: Location;
  passengers: Array<string>;
}