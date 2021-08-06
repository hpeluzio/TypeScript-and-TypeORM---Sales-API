import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import OrderController from '../controllers/OrderController';

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderController.create,
);

export default ordersRouter;
