import { controller, httpDelete, httpGet, httpPost, httpPut, params } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserDTO, CreateUserDTO, UpdateUserDTO, ResponseUserDTO, ResponseDTO } from '../../dtos';
import { User } from '../../models';
import { UserService } from '../../services';
import { TYPES } from '../../core/types';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';

@controller('/v1')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/users')
  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll();
    const usersDTO: Array<ResponseUserDTO> = users.map(UserDTO.fromModel);
    const responseDTO = new ResponseDTO<Array<ResponseUserDTO>>(usersDTO);
    return res.json(responseDTO);
  }

  @httpGet('/users/:id')
  async get(req: Request, res: Response) {
    const user = await this.userService.getById(req.params.id);
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    return res.json(new ResponseDTO<ResponseUserDTO>(UserDTO.fromModel(user)));
  }

  @httpPost('/users')
  async create(req: Request, res: Response) {
    const userDTO = plainToClass(CreateUserDTO, req.body);
    let createdUser: User;
    try {
      const user = userDTO.toModel();
      createdUser = await this.userService.create(user);

      return res.json(new ResponseDTO<ResponseUserDTO>(UserDTO.fromModel(createdUser)));
    } catch (error) {
      return res.status(500).json({ message: 'Create user failed!' });
    }
  }

  @httpPut('/users/:id')
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const userDTO = plainToClass(UpdateUserDTO, req.body);
    const user: User = userDTO.toModel();
    const updatedUser = await this.userService.update(id, user);
    return res.json(new ResponseDTO<ResponseUserDTO>(UserDTO.fromModel(updatedUser)));
  }

  @httpDelete('/users/:id')
  async delete(req: Request, res: Response) {
    const status = await this.userService.delete(req.params.id);
    return res.json(new ResponseDTO<boolean>(status));
  }
}
