import { Router } from 'express';
import UserController from '../controllers/UserController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

// import createUserValidator from './validators/createUserValidator';

import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', isAuthenticated, userController.index);
// usersRouter.get(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   userController.show,
// );
// usersRouter.use(validator).post('/', userController.create);
// usersRouter.post('/', createUserValidator, userController.create);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
// usersRouter.put(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       price: Joi.number().precision(2).required(),
//       quantity: Joi.number().precision(2).required(),
//     },
//   }),
//   userController.update,
// );
// usersRouter.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   userController.delete,
// );

export default usersRouter;
