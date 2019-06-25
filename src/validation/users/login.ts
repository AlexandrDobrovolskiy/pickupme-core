import { buildCheckFunction } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

export const loginFromTelegram = [
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('telegramId', 'telegramId, is invalid or not provided.').isString().isLength({ min: 5 }),
];

export const loginFromMobile = [
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('uid', 'uid, is invalid or not provided.').isString().isLength({ min: 4 }),
];
