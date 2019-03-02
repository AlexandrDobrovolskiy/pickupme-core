import { Document } from 'mongoose';

export interface Location extends Document {
  type: string,
  coordinates: Array<number>
}