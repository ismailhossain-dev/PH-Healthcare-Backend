import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

import z from "zod";

export const validationRequest = (zodSchema: z.ZodObject) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    const payload = req.body ?? {};
    const result = zodSchema.safeParse(payload);

    if (!result.success) {
      console.log(result.error);
      console.log(result.error.issues);
      throw new Error(result.error.issues[0].message);
    }
    //req.body reasigned kore deyar karon holo controller req.body te data pawer jonno
    req.body = result.data;

    next();
  });
};