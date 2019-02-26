import { buildCheckFunction, oneOf } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

const createFromTelegram = [ 
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('name', 'name is invalid or not provided.').isString().isLength({ min: 1 }),
  checkBody('telegramId', 'telegramId is invalid or not provided.').isString().isLength({ min: 5 }),
];

const loginFromTelegram = [
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('telegramId', 'telegramId, is invalid or not provided.').isString().isLength({ min: 5 }),
];

export const login = oneOf([ createFromTelegram, loginFromTelegram ]);