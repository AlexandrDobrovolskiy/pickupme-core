import { Model, model } from 'mongoose';

import * as jwt from 'jsonwebtoken';

import { User } from './user';
import { UserSchema } from './users.schema';
import { exec } from 'child_process';

export class UsersModel {
  private static collectionName: string = 'Users';
  private static _model: Model<User> = model<User>(
    UsersModel.collectionName,
    UserSchema
  );

  public static async create(phone: string, name: string, telegramId: string) {
    const user = await this._model.create({ phone, name, telegramId });

    return user;
  }

  public static async assignFirebaseToken(_id: string, firebaseId: string) {
    const token = jwt.sign(firebaseId, 'secret');

    return await this._model.updateOne({ _id }, { authentication: { firebase: token } }).exec();
  }

  public static async createWithFirebase(phone: string, name: string, firebaseId: string) {
    const user = await UsersModel.create(phone, name, '');
    await UsersModel.assignFirebaseToken(user._id, firebaseId);

    return (await this._model.findById(user._id).exec()).toJSON();
  }

  public static async findOne(conditions: any) {
    return await this._model.findOne(conditions).exec();
  }

  public static async findSubscribersByIdArray(userIds: Array<string>): Promise<object[]> {
    const users =  await this._model.find({ _id: { $in: userIds } });

    return users.map(user => ({
      telegramId: user.telegramId,
      phone: user.phone,
      name: user.name,
    }));
  }
}
