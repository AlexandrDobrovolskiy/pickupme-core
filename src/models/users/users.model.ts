import { Model, model } from 'mongoose';

import * as jwt from 'jsonwebtoken';

import { User } from './user';
import { UserSchema } from './users.schema';

export class UsersModel {
  private static collectionName: string = 'Users';
  private static _model: Model<User> = model<User>('User', UserSchema);

  public static async create(phone: string, name: string, telegramId: string) {
    const token: string = jwt.sign({ phone }, 'secret');
    const user = await this._model.create({ phone, name, telegramId, token });

    return user;
  }

  public static async findOne(conditions: any) {
    return await this._model.findOne(conditions).exec();
  }
}
