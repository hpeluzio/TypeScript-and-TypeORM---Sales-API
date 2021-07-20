import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

// routes.get('/', (req, res) => {
//   return res.json({ message: 'Hello World' });
// });

export default routes;
