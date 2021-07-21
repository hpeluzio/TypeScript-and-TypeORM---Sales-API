import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    // console.log('req.user: ', request.user);
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute(request.body);
    return response.status(200).json(user);
  }
}
