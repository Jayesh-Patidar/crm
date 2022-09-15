import { env } from '@app/server/core';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: env('APP_NAME', 'CRM'),
  env: env('APP_ENV', 'development'),
  debug: env('APP_DEBUG', false),
  port: env('APP_PORT', 5000),
}));
