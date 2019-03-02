import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

import { ResponseUtils, createError, StatusCodes } from '../../utils/response';

export const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    ResponseUtils.json(res, false, createError(StatusCodes.BAD_REQUEST, 'Bad Request', errors));
    return;
  }

  next();
}