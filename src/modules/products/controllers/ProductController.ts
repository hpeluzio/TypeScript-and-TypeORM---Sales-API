import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log('index');
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });
    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    console.log('create');
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return response.status(200).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateProduct = new DeleteProductService();
    await updateProduct.execute({ id });
    return response.status(200).json([]);
  }
}
