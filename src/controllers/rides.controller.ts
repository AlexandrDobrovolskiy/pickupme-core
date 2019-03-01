import { Request, Response } from 'express';

import { RidesModel } from '../models/rides';

export default class RidesController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { driverId, departure, arival, date, seats, price } = req.body;

    const ride = await RidesModel.create(driverId, departure, arival, date, seats, price);

    res.json(ride);
  }
}

export const ridesController = new RidesController();