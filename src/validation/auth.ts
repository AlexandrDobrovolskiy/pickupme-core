import { buildCheckFunction } from 'express-validator/check';

const checkHeaders = buildCheckFunction(['headers']);

export const authValidation = checkHeaders('Authorization')
  .isString()
  .withMessage('Authorization header must be provided.')
  .custom(token => {
    if (token.split('.').length !== 3) {
      return Promise.reject('Authentication token is incorrect.');
    }

    return Promise.resolve(token);
  });