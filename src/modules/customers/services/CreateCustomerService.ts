import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute(data: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customerExists = await customersRepository.findByEmail(data.email);
    if (customerExists) {
      throw new AppError('There is already a customer with this email', 400);
    }

    const customer = customersRepository.create(data);

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
