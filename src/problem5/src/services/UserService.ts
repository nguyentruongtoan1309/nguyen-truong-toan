import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../models';
import { UserRepository } from '../repositories';

@Service()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // Handle error
      throw new Error('Failed to fetch users');
    }
  }

  public async getById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      // Handle error
      throw new Error('Failed to fetch user by id');
    }
  }

  public async create(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      // Handle error
      throw new Error('Failed to create user');
    }
  }

  public async update(id: string, user: User): Promise<User> {
    try {
      await this.userRepository.update(id, user);
      return user;
    } catch (error) {
      // Handle error
      throw new Error('Failed to update user');
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.softDelete({ id });
      return true;
    } catch (error) {
      // Handle error
      throw new Error('Failed to delete user');
    }
  }
}
