import { Model, model } from "mongoose";

import { Ride } from "./ride";
import { RideSchema } from "./rides.schema";

import { Location } from "../location";
import { RidesQueries } from "./rides.queries";
import { DEFAULT_SEARCH_INTERVAL } from "./constants";

export class RidesModel {
  private static _collectionName: string = "Rides";
  private static _model: Model<Ride> = model<Ride>(
    RidesModel._collectionName,
    RideSchema
  );

  public static async create(
    driverId: string,
    date: Date,
    price: number,
    seats: number,
    arrival: Location,
    departure: Location
  ) {
    const ride = await this._model.create({
      driverId, date, price, seats, arrival, departure
    });

    return ride.toJSON();
  }

  public static async search(departure: Location, arrival: Location, date: Date) {
    const rides = await this._model.find(
      RidesQueries.find(new Date(date), DEFAULT_SEARCH_INTERVAL, departure, arrival)
    ).exec();

    return rides;
  }

  public static async get() {
    // @TODO: implement this method
  }

  public static async moveToHistory(rideId: number) {
    // @TODO: implement this method
  }
}
