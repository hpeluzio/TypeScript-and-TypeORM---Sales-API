import { NextFunction, Request, Response } from 'express';

import { ProductDto } from '@modules/products/dto/ProductDto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default async function CreateProductValidator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const product = plainToClass(ProductDto, request.body);
  const errors = await validate(product);

  if (errors.length > 0) {
    let message = '';

    for (const er of errors) {
      for (const key in er.constraints) {
        message = message + `${er.constraints[key]} `;
      }
    }
    console.log(message);

    throw new AppError(message, 400);
  }

  next();
}
