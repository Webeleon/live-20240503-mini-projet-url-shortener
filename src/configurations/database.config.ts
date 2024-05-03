import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

interface DatabaseConfig {
  type: 'postgres';
  port: number;
  host: string;
  user: string;
  password?: string;
  database: string;
}

const databaseConfigSchema = Joi.object<DatabaseConfig>({
  type: Joi.string().equal('postgres').required(),
  port: Joi.number().port().required(),
  host: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().optional(),
  database: Joi.string().required(),
});

export const databaseConfig = registerAs('database', async () => {
  const config: DatabaseConfig = {
    type: 'postgres',
    database: process.env.DB_NAME ?? 'live_url_shortener',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
  };

  await databaseConfigSchema.validateAsync(config, {
    abortEarly: false,
    context: {
      value: 'database config',
    },
  });

  return config;
});
