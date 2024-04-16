import { InversifyExpressServer } from 'inversify-express-utils';
import container from './container';

export const server = new InversifyExpressServer(container, null, { rootPath: '/api/' });
