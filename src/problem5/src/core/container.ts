import { Container } from 'inversify';
import { TYPE, interfaces } from 'inversify-express-utils';
import { TYPES } from './types';
import { HomeController } from '../controllers/v1/HomeController';
import { UserController } from '../controllers/v1/UserController';
import { UserService } from '../services';

const container = new Container({ skipBaseClassChecks: true });
container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TYPES.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TYPES.UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);

export default container;
