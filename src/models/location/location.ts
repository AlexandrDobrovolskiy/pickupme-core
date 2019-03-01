import { Document } from 'mongoose';

export interface Location extends Document {
  latitude: number;
  longitude: number;
}