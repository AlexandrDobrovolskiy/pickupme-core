import { buildCheckFunction, oneOf } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

export const create = [
  checkBody('driverId', 'driverId is invalid or not provided.').isString().isLength({ min: 5 }),
  checkBody('date', 'date is invalid or not provided.').custom((date) => { 
    if (!date) {
      return Promise.reject(); 
    }

    return Promise.resolve(date);
  }),
  checkBody('arival', 'arival is invalid or not provided.').custom((arival) => { 
    if (!arival) {
      return Promise.reject(); 
    }

    return Promise.resolve(arival);
  }),
  checkBody('departure', 'departure is invalid or not provided.').custom((departure) => { 
    if (!departure) {
      return Promise.reject(); 
    }

    return Promise.resolve(departure);
  }),
  checkBody('seats', 'seats is invalid or not provided.').isNumeric().custom((seats) => { 
    if (!seats) {
      return Promise.reject(); 
    }

    return Promise.resolve(seats);
  }),
  checkBody('price', 'price is invalid or not provided.').isNumeric()
]
