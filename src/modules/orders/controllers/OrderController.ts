import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    console.log(id);
    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return response.status(200).json(order);
  }
}
