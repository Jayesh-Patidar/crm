import next from 'next';
import config from '@config/index';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { CoreModule } from './core';
import { env } from '@app/server/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: config,
        }),
        CoreModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
