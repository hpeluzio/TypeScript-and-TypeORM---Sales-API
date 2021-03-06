import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmailService.execute({ email });

    // const createUserService = new CreateUserService();
    // const user = await createUserService.execute(email);
    return response.status(200).json();
  }
}
