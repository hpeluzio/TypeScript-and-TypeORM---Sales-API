import { Router } from 'express';
import ProductController from '../controllers/ProductController';

// import createProductValidator from './validators/createProductValidator';

import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/', productController.index);
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.show,
);
// productsRouter.use(validator).post('/', productController.create);
// productsRouter.post('/', createProductValidator, productController.create);
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(2).required(),
    },
  }),
  productController.create,
);
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().precision(2).required(),
    },
  }),
  productController.update,
);
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete,
);

export default productsRouter;
