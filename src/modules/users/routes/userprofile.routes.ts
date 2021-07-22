import { Router } from 'express';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(isAuthenticated);

userProfileRouter.post(
  '/show',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  userProfileController.show,
);

userProfileRouter.put(
  '/update',
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
  userProfileController.show,
);

export default userProfileRouter;
