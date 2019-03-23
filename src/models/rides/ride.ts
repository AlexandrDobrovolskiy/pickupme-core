import { Document } from 'mongoose';

import { Location } from '../location';
import { Contact } from '../../models/contact';

export interface Ride extends Document {
  driver: Contact;
  seats: number;
  price: number;
  date: Date;
  departure: Location;
  arrival: Location;
  passengers: Array<string>;
}