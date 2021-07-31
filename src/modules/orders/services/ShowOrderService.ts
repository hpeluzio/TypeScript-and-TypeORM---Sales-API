import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orderExist = await ordersRepository.findById(id);

    if (!orderExist) {
      throw new AppError('Could not find any order with the given id');
    }

    return orderExist;
  }
}
