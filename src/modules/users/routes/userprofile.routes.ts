import { Router } from 'express';

import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(isAuthenticated);

userProfileRouter.get('/', userProfileController.show);

userProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  userProfileController.update,
);

export default userProfileRouter;
