import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });

    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // console.log('req.user: ', request.user);
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return response.status(200).json(user);
  }
}