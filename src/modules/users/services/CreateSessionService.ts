import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

// interface IUser extends User {
//   password?: string;
// }

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute(data: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(data.email);
    if (!userExists) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordConfirmed = await compare(data.password, userExists.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: userExists.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    // const { password, ...userWithoutPassword } = userExists;

    // return userExists;
    return {
      user: userExists,
      token: token,
    };
  }
}

export default CreateSessionService;
