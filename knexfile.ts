import { Knex } from 'knex';
import { env } from './src/server/core';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: env('DB_TYPE', 'mysql2'),
  debug: env('DB_DEBUG', false),
  connection: {
    host: env('DB_HOST', 'localhost'),
    port: env('DB_PORT', 3306),
    database: env('DB_DATABASE', ''),
    user: env('DB_USER', 'root'),
    password: env('DB_PASSWORD', ''),
    charset: 'utf8',
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/server/database/migrations',
    stub: './src/server/database/stubs/migration.stub',
    extension: 'ts',
  },
  seeds: {
    directory: './src/server/database/seeds',
    stub: './src/server/database/stubs/seed.stub',
    recursive: true,
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
