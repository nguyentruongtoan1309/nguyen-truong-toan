import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import config from './config';
import { Logger } from './loggers';
import { server } from './core/server';
import * as morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './db';

class App {
  public app: express.Application;
  public config: Record<string, any>;
  public logger: Logger;

  constructor(config: Record<string, any>) {
    this.config = config;
    this.logger = Logger.getLogger({ component: 'app' });
  }

  public startServer() {
    connectDB;
    server
      .setConfig((app) => {
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(morgan('combined'));
        app.use(helmet());
      })
      .build()
      .listen(config.app.port, () => console.log(`Listen on http://localhost:${config.app.port}`));
  }
}

const app = new App(config);
app.startServer();

export default app;
