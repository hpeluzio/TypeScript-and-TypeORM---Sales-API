import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { IsString, Min, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProductDto } from '../dto/ProductDto';

// interface IRequest {
//   name: string;
//   price: number;
//   quantity: number;
// }

class CreateProductService {
  public async execute(data: ProductDto): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(data.name);
    if (productExists) {
      throw new AppError('There is already a product with this name', 400);
    }

    const product = productRepository.create(data);

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
