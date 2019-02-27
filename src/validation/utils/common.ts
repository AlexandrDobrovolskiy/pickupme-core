import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

export const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    res.json({ status: false, errors });
    return;
  }

  next();
}