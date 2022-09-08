import config from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: config,
        }),
        UserModule,
    ],
})
export class AppModule {}
