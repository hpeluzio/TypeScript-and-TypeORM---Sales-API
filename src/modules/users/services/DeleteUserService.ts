import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 400);
    }

    await usersRepository.remove(user);
  }
}
