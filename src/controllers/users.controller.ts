import { Request, Response } from 'express';

import { UsersModel } from '../models/users';
import { ResponseUtils, createError } from '../utils/response'; 

export default class UsersController {
  public loginWithPhone = async (req: Request, res: Response): Promise<void> => {
    const { phone } = req.body;
    const existed = await UsersModel.findOne({ phone });

    if (existed) {
      ResponseUtils.json(res, true, { user: existed });
      return;
    }

    ResponseUtils.json(res, false, createError(
      404,
      'User not found.',
      { phone: `There are no user with phone '${phone}'.` }
    ));
  }

  public registrWithTelegram = async (req: Request, res: Response): Promise<void> => {
    const { phone, name, telegramId } = req.body;

    const existed = await UsersModel.findOne({ phone });

    if (existed) {
      ResponseUtils.json(res, false, createError(
        409,
        'User already exists.',
        { error: `User with phone '${phone}' is already registered.` }  
      ));
      return;
    }

    const created = await UsersModel.create(phone, name, telegramId);

    if (!created) {
      ResponseUtils.json(res, false, createError(
        503,
        'Something went wrong :(',
        { error: 'Internal server error while creating new User' }
      ));
      return;
    }

    ResponseUtils.json(res, true, { user: created });
  }

  public get(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' });
  }
}

export const usersController = new UsersController();