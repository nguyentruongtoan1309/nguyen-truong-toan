import { config as loadDotEnv } from 'dotenv';

loadDotEnv();

export const config = {
  env: process.env.NODE_ENV || 'development',
  app: {
    port: Number(process.env.PORT || 5000),
  },
};

export default config;
