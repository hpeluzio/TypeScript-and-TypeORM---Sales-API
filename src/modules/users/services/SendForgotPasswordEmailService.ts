import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userExists = await usersRepository.findByEmail(email);
    if (!userExists) {
      throw new AppError('User does not exists.');
    }

    console.log('userExists: ', userExists);

    const userToken = await userTokensRepository.generate(userExists.id);

    console.log(userToken);
  }
}
