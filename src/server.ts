import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './shared/http/routes';
import '@shared/typeorm';
import handleErrorsMiddleware from '@shared/errors/handleErrorsMiddleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(handleErrorsMiddleware);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
