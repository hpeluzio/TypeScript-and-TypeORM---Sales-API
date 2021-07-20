import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionService {
  public async execute(data: IRequest): Promise<User | undefined> {
    console.log('OKOKOK');
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(data.email);
    if (!userExists) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordConfirmed = await compare(data.password, userExists.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password', 401);
    }

    const { password, ...user } = userExists;

    return user;
  }
}

export default CreateSessionService;
