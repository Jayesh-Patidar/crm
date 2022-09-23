import { env } from "@app/server/core";
import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    jwt: {
        secret: env('APP_KEY'),
        expiresIn: '24h',
        rememberMeExpiresIn: '120h'
    }
}))