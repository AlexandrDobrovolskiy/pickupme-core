import { Document } from "mongoose";
import { Location } from "../location";

export interface Subscription extends Document {
  date: Date;
  subscriberId: string;
  seats: number;
  departure: Location;
  arrival: Location;
  canceled: boolean;
}