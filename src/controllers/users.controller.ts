import { Request, Response } from 'express';

import FirebaseAdmin from '../services/firebase-admin/FirebaseAdmin';
import { UsersModel } from '../models/users';
import { ResponseUtils, createError } from '../utils/response'; 

export default class UsersController {
  public loginWithPhone = async (req: Request, res: Response): Promise<void> => {
    const { phone } = req.body;
    const existed = await UsersModel.findOne({ phone });

    if (!existed) {
      ResponseUtils.json(res, false, createError(
        404,
        'User not found.',
        { phone: `There are no user with phone '${phone}'.` }
      ));
      return;
    }

    ResponseUtils.json(res, true, { user: existed });
  }

  public loginFromMobile = async (req: Request, res: Response): Promise<void> => {
    const { phone, token } = req.body;
    let auth;
    
    try {
      auth = await FirebaseAdmin.verifyToken(token);
    } catch (err) {
      ResponseUtils.json(res, false, createError(
        401,
        'Invalid firebase unique id token.',
        { token: `Expected valid firebase \'token\' for this user, but got ${token}`, uid: auth.uid }
      ));
      return;
    }
    
    const user = await UsersModel.findOne({ phone });
    if (!user) {
      ResponseUtils.json(res, false, createError(
        404,
        'User not found.',
        { phone: `There are no user with phone '${phone}'.`, uid: auth.uid }
      ));
      return;
    }

    ResponseUtils.json(res, true, user.toJSON());
  }

  public registerWithTelegram = async (req: Request, res: Response): Promise<void> => {
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

  public registerWithMobile = async (req: Request, res: Response): Promise<void> => {
    const { phone, name, uid } = req.body;

    const existed = await UsersModel.findOne({ phone });

    if (existed && existed.authentication.firebase) {
      ResponseUtils.json(res, false, createError(
        409,
        'User already exists.',
        { error: `User with phone '${phone}' is already registered.` }  
      ));
      return;
    }

    if (existed) {
      const updated = await UsersModel.assignFirebaseToken(existed.id, uid);

      ResponseUtils.json(res, true, { user: updated });
      return;
    }

    const created = await UsersModel.createWithFirebase(phone, name, uid);

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
  
}

export const usersController = new UsersController();
