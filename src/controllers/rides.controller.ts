import { Request, Response } from 'express';

import { RidesModel } from '../models/rides';
import { ResponseUtils } from '../utils/response';

export default class RidesController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { driverId, departure, arival, date, seats, price } = req.body;

    const ride = await RidesModel.create(driverId, departure, arival, date, seats, price);

    ResponseUtils.json(res, true, ride);
  }

  public search = async (req: Request, res: Response): Promise<void> => {
    const { arival, departure } = req.body;
  }
}

export const ridesController = new RidesController();