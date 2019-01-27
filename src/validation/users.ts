import { buildCheckFunction, oneOf } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

const createFromTelegram = [ 
  checkBody('phone').exists().isMobilePhone('uk-UA'),
  checkBody('name').exists().isString().isLength({ min: 1 }),
  checkBody('telegramId').exists().isString().isLength({ min: 5 }),
];

const loginFromTelegram = [
  checkBody('phone').exists().isMobilePhone('uk-UA'),
  checkBody('telegramId').exists().isString().isLength({ min: 5 }),
];

export const login = oneOf([ createFromTelegram, loginFromTelegram ]);