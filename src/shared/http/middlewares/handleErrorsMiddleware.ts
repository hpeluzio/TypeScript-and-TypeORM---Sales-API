import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default function (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  // ERROR LOG
  // console.log('error:: ', error);

  if (error instanceof AppError) {
    console.log(error);
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  return response
    .status(500)
    .json({ status: 'Error', message: 'Internal server error!' });

  next();
}
