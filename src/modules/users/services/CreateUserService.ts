import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(data: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(data.email);
    if (userExists) {
      throw new AppError('There is already a user with this email', 400);
    }

    const hashedPass = await hash(data.password, 10);

    data.password = hashedPass;

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
