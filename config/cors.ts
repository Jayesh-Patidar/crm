import { env } from '@app/server/core';
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    origin: env('CORS_ALLOWED_ORIGIN', '')
        .split(',')
        .map((url: string) => url.trim()),
    methods: env(
        'CORS_ALLOWED_METHODS',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    ),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
