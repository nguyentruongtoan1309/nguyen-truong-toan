import config from './config';

export default {
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
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migrations',
  },
};
