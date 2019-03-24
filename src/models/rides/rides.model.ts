import { Model, model } from "mongoose";

import { Ride } from "./ride";
import { RideSchema } from "./rides.schema";

import { Location } from "../location";
import { RidesQueries } from "./rides.queries";
import { DEFAULT_SEARCH_INTERVAL } from "./constants";

import { UsersModel } from "../../models/users";
import { Contact } from "../../models/contact";

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
    const driver = await UsersModel.findOne({ _id: driverId });

    if (!driver) {
      return null;
    }

    const { name, phone } = driver;
    const driverContact = { name, phone } as Contact;

    const ride = await this._model.create({
      driverContact, date, price, seats, arrival, departure
    });

    return ride.toJSON();
  }

  public static async search(date: Date, seats: number, departure: Location, arrival: Location) {

    const rides = await this._model.find(
      RidesQueries.find(new Date(date), seats, DEFAULT_SEARCH_INTERVAL, departure, arrival)
    ).exec();

    return rides;
  }

  public static async getDriver(driverId: string) {
    return await this._model.find({ driverId }).exec();
  }

  public static async getPassanger(passangerId: string) {
    return await this._model.find({ passangers: { $elemMatch: passangerId } }).exec();
  }

  public static async moveToHistory(rideId: number) {
    // @TODO: implement this method
  }
}
