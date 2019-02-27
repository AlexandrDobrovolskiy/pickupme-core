import { Schema } from 'mongoose';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const ILocationSchemaType = {
  latitude: {
    type: Schema.Types.Number,
    required: true
  },
  longitude: {
    type: Schema.Types.Number,
    required: true
  }
}

