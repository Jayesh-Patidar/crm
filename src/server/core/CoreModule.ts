import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import * as KnexConfig from '../../../knexfile';
import { KNEX_CONNECTION } from './constants';
import { Model } from './database';
import { Validator } from './validator';

Model.knex(Knex(KnexConfig));

@Global()
@Module({
    providers: [
        Validator,
        { provide: KNEX_CONNECTION, useFactory: async () => Knex(KnexConfig) },
    ],
    exports: [Validator],
})
export class CoreModule {}
