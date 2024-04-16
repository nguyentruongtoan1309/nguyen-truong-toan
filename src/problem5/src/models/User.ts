import { IsEmail } from 'class-validator';
import { Entity, Column, Unique } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity()
export class User extends BaseModel {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  @Unique('email_user', ['email'])
  email: string;
}
