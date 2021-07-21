import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not founded');
    }

    const userExists = await usersRepository.findByName(name);

    if (userExists) {
      throw new AppError('There is already a user with this name');
    } else {
      user.name = name;
      // user.email = price;
      // user.quantity = quantity;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
