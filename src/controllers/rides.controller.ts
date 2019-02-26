import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

export default class RidesController {
  public create(req: Request, res: Response): void {
    const error = validationResult(req).mapped();

    if (error) {
      res.json(error);
      return;
    }

    res.json({ msg: 'Hello!' });
  }
}

export const ridesController = new RidesController();