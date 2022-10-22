import config from '@config/index';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { CoreModule } from './core';
import { ItemModule } from './items';
import { CustomerModule } from './customer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepairingModule } from './repairing';

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
        ItemModule,
        CustomerModule,
        RepairingModule,
    ],
})
export class AppModule {}
