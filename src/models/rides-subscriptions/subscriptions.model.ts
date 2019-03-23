import { Model, model } from "mongoose";

import { Subscription } from "./subscription";
import { SearchSubscriptionSchema } from "./subscriptions.schema";
import { SubscriptionQueries } from './subscriptions-queries';

import { Location } from "../location";
import { DEFAULT_SEARCH_INTERVAL } from "../../models/rides/constants";

export class SubscriptionsModel {
  private static COLLECTION_NAME: string = "RidesSubscriptions";
  private static EXPIRE_DELAY: number = 30 * 60 * 1000;   // 30 min. Determines expire delay after search time.

  private static _model: Model<Subscription> = model<Subscription>(
    SubscriptionsModel.COLLECTION_NAME,
    SearchSubscriptionSchema
  );

  public static async create(
    date: Date,
    seats: number,
    arrival: Location,
    departure: Location,
    subscriberId: string,
  ) {
    const expires = new Date(date.getTime() + SubscriptionsModel.EXPIRE_DELAY);
    const subscription = await this._model.create([{ date, seats, arrival, departure, subscriberId }], { expires });

    return subscription.toJSON();
  }

  public static async findNearby(
    date: Date,
    seats: number,
    arrival: Location,
    departure: Location
  ) {
    const subscriptions = await this._model.find(
      SubscriptionQueries.find(date, seats, DEFAULT_SEARCH_INTERVAL, departure, arrival)
    ).exec();

    return subscriptions;
  }

  public static async cancel(subscriptionId: string) {
    const updateResult = await this._model.updateOne(subscriptionId, { canceled: true }).exec();

    // @TODO: check update result and return boolean

    return updateResult;
  }
  
}
