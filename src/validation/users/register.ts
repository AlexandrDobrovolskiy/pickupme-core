import { buildCheckFunction } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

export const registerFromTelegram = [ 
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('name', 'name is invalid or not provided.').isString().isLength({ min: 1 }),
  checkBody('telegramId', 'telegramId is invalid or not provided.').isString().isLength({ min: 5 }),
];

export const registerFromMobile = [ 
  checkBody('phone', 'phone is invalid or not provided.').isMobilePhone('uk-UA'),
  checkBody('name', 'name is invalid or not provided.').isString().isLength({ min: 1 }),
  checkBody('uid', 'telegramId is invalid or not provided.').isString().isLength({ min: 5 }),
];