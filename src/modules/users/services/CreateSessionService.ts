import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IUser extends User {
  password?: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

class CreateSessionService {
  public async execute(data: IRequest): Promise<IResponse> {
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

    const token = sign({}, 'f39ae121bbbe65eabfe4dcb1fc55bfae', {
      subject: userExists.id,
      expiresIn: '365d',
    });

    const { password, ...userWithoutPassword } = userExists;

    // return userExists;
    return {
      user: userWithoutPassword,
      token: token,
    };
  }
}

export default CreateSessionService;
