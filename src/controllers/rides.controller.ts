import { Request, Response } from 'express';

import { Rides } from '../models/ride.model';
import IRidePoint from '../services/rides/IRidePoint';

export default class RidesController {
  private createRide = async (rideSchema: any) => {
    const ride = await Rides.create(rideSchema);

    return ride;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    const { driverId, departure, arival, date, seats, price } = req.body;

    const ride = await this.createRide({ driverId, departure, arival, date, seats, price });

    res.json(ride);
  }
}

export const ridesController = new RidesController();