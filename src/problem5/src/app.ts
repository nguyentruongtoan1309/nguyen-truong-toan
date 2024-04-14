import 'reflect-metadata';
import * as express from 'express';
import { useExpressServer, useContainer as useRoutingContainer } from 'routing-controllers';
import { createConnection, Connection, useContainer as useORMContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import dbConfig from './db';
import config from './config';
import { Logger, HttpLogger } from './loggers';
import { UserController } from './controllers/v1/UserController';
import { HomeController } from './controllers/v1/HomeController';

class App {
  public app: express.Application;
  public config: Record<string, any>;
  public logger: Logger;
  public connection: Connection;

  constructor(config: Record<string, any>) {
    this.app = express();
    this.config = config;
    this.logger = Logger.getLogger({ component: 'app' });
    this.init();
  }

  private async init() {
    // Configure HTTP Access Logs using Morgan
    this.app.use(HttpLogger());

    // Use TypeDI Container for TypeORM and Routing DI
    useORMContainer(Container);
    useRoutingContainer(Container);

    // Establish the TypeORM connection
    try {
      this.connection = await createConnection(dbConfig);
      this.logger.info('Database connected!');
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      return;
    }

    // TODO: Add middlewares, etc
    useExpressServer(this.app, {
      controllers: [UserController, HomeController],
    });
  }

  public start() {
    this.app.listen(this.config['app']['port'], () => {
      console.log(`API Server is running: http://localhost:${this.config['app']['port']}`);
    });
  }
}

const app = new App(config);
app.start();

export default app;
