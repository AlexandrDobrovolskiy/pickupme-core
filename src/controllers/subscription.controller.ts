import { Request, Response } from 'express';

import { SubscriptionsModel } from '../models/rides-subscriptions';
import { ResponseUtils, createError } from '../utils/response'; 

export default class SubscriptionsController {
  public subscribe = async (req: Request, res: Response): Promise<void> => {
    // @TODO: implement this method
  }

  public notifyTelegram = async (req: Request, res: Response): Promise<void> => {
    // @TODO: Implement this method
  }
}

export const subscriptionsController = new SubscriptionsController();