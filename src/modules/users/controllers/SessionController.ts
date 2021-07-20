import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute(request.body);
    return response.status(200).json(user);
  }
}
