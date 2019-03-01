import { Request, Response } from 'express';

import { UsersModel } from '../models/users';

export default class UsersController {
  public loginWithTelegram = async (req: Request, res: Response): Promise<void> => {
    const { phone, name, telegramId } = req.body;
    const existed = await UsersModel.findOne({ phone });

    if (existed) {
      res.json({ user: existed });
      return;
    }

    const created = await UsersModel.create(phone, name, telegramId);
    res.json({ user: created });
  }

  public get(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' });
  }
}

export const usersController = new UsersController();