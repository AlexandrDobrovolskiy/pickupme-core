import { buildCheckFunction, oneOf } from 'express-validator/check';

const checkBody = buildCheckFunction(['body']);

export const search = [
  checkBody('date', 'date is invalid or not provided.'),
  checkBody('arrival', 'arrival is invalid or not provided.').custom((arrival) => { 
    if (!arrival) {
      return Promise.reject(); 
    }

    return Promise.resolve(arrival);
  }),
  checkBody('departure', 'departure is invalid or not provided.').custom((departure) => { 
    if (!departure) {
      return Promise.reject(); 
    }

    return Promise.resolve(departure);
  }),
  checkBody('seats', 'seats is invalid or not provided.').isNumeric().custom((seats) => { 
    if (seats <= 0) {
      return Promise.reject(); 
    }

    return Promise.resolve(seats);
  }),
]
