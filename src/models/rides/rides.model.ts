import { Model, model } from "mongoose";

import { Ride } from "./ride";
import { RideSchema } from "./rides.schema";

import { Location } from "../location";

export class RidesModel {
  private static _collectionName: string = "Ride";
  private static _model: Model<Ride> = model<Ride>(
    RidesModel._collectionName,
    RideSchema
  );

  public static async create(
    driverId: string,
    date: Date,
    price: number,
    seats: number,
    arival: Location,
    departure: Location
  ) {
    const ride = await this._model.create({
      driverId, date, price, seats, arival, departure
    });

    return ride;
  }

  public static async search(location: Location) {
    // @TODO: implement this method 
  }

  public static async get() {
    // @TODO: implement this method
  }

  public static async moveToHistory(rideId: number) {
    // @TODO: implement this method
  }
}
