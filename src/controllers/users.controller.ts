import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import * as jwt from 'jsonwebtoken';

import { Users } from '../models/user.model';

export default class UsersController {
  private createUser = async (phone: string, name: string, telegramId: string) => {
    const token: string = jwt.sign({ phone }, 'secret');
    const user = await Users.create({ phone, name, telegramId, token });

    return user;
  }

  public loginWithTelegram = async (req: Request, res: Response): Promise<void> => {
    const { phone, name, telegramId } = req.body;
    const existed = await Users.findOne({ phone }).exec();

    if (existed) {
      res.json({ user: existed });
      return;
    }

    const created = await this.createUser(phone, name, telegramId);
    res.json({ user: created });
  }

  public get(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' });
  }
}

export const usersController = new UsersController();