import { Request, Response } from "express";

export const useController = (
  controller: (req: Request, res: Response) => Promise<void>
) => async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    await controller(req, res);
  } catch (error) {
    next(error);
  }
};
