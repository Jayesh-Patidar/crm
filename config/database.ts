import { registerAs } from '@nestjs/config';
import { env } from '@app/server/core/helper';

export default registerAs('database', () => ({
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
    directory: '@app/server/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: '@app/server/database/seeds',
    recursive: true,
  },
}));
