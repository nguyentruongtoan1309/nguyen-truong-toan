import config from './config';
import { DataSource } from 'typeorm';

// Using environment variables
import { config as loadDotEnv } from 'dotenv';
loadDotEnv();

const connectDB = new DataSource({
  type: config.db.type as never,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  logging: config.db.logging,
  migrationsRun: config.db.migrationsRun,
  synchronize: config.db.synchronize,
  entities: [`${__dirname}/models/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  ssl: false,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
