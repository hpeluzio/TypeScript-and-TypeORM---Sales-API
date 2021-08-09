import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './shared/http/routes';
import '@shared/typeorm';
import handleErrorsMiddleware from '@shared/http/middlewares/handleErrorsMiddleware';
import uploadConfig from '@config/upload';
import { limiter } from '@config/rate-limit';

const app = express();

app.use(limiter);

app.use(cors());

app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(handleErrorsMiddleware);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
