import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token, password });

    // const createUserService = new CreateUserService();
    // const user = await createUserService.execute(email);
    return response.status(200).json();
  }
}
