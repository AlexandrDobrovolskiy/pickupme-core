import { Request, Response } from 'express';

import { RidesModel } from '../models/rides';
import { ResponseUtils } from '../utils/response';

export default class RidesController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { driverId, departure, arrival, date, seats, price } = req.body;

    const ride = await RidesModel.create(driverId, date, price, seats, arrival, departure);

    ResponseUtils.json(res, true, ride);
  }

  public search = async (req: Request, res: Response): Promise<void> => {
    const { arrival, departure, date } = req.body;

    const nearbyRides = await RidesModel.search(date, departure, arrival);

    ResponseUtils.json(res, true, { rides: nearbyRides })
  }
}

export const ridesController = new RidesController();