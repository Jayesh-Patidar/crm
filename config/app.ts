import { registerAs } from '@nestjs/config';
import { env } from '@app/server/core/helper';

export default registerAs('app', () => ({
  name: env('APP_NAME', 'CRM'),
  env: env('APP_ENV', 'development'),
  debug: env('APP_DEBUG', false),
  port: env('APP_PORT', 5000),
}));
