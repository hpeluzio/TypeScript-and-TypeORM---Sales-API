import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
// import { ProductDto } from '../dto/ProductDto';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    console.log('aqui');
    console.log(data);
    const productExists = await productsRepository.findByName(data.name);
    if (productExists) {
      throw new AppError('There is already a product with this name', 400);
    }

    const product = productsRepository.create(data);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
