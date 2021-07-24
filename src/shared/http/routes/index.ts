import productsRouter from '@modules/products/routes/product.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import usersRouter from '@modules/users/routes/user.routes';
import userProfileRouter from '@modules/users/routes/userprofile.routes';
import customersRouter from '@modules/customers/routes/customer.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/userprofile', userProfileRouter);
routes.use('/customers', customersRouter);

// routes.get('/', (req, res) => {
//   return res.json({ message: 'Hello World' });
// });

export default routes;
