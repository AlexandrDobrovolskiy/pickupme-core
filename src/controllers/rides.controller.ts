import { Request, Response } from 'express';

import { RidesModel } from '../models/rides';
import { ResponseUtils } from '../utils/response';
import { SubscriptionsModel } from '../models/rides-subscriptions';
import { TelegramNotifier } from '../services/telegram-notifier/telegram-notifier';
import { UsersModel } from '../models/users';

export default class RidesController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { driverId, departure, arrival, date, seats, price } = req.body;

    const ride = await RidesModel.create(driverId, date, price, seats, arrival, departure);
    const subs = await SubscriptionsModel.findNearby(date, seats, arrival, departure);

    const telegramIds = await UsersModel.getTelegramIds(subs);
    TelegramNotifier.notify(ride, telegramIds);

    ResponseUtils.json(res, true, ride);
  }

  public search = async (req: Request, res: Response): Promise<void> => {
    const { arrival, departure, date, seats, userId } = req.body;
    const dateObj = new Date(date);

    // Subscribe user for notifications
    SubscriptionsModel.create(dateObj, seats, arrival, departure, userId);

    const nearbyRides = await RidesModel.search(dateObj, seats, departure, arrival);

    ResponseUtils.json(res, true, { rides: nearbyRides })
  }
}

export const ridesController = new RidesController();