import { Module } from "@nestjs/common";
import Knex  from "knex";
import * as KnexConfig from '../../../knexfile'
import { KNEX_CONNECTION } from "./constants";
import { Model } from "./database";

Model.knex(Knex(KnexConfig))

@Module({
    providers: [
        { provide: KNEX_CONNECTION, useFactory:async () => Knex(KnexConfig)}
    ]
})
export class CoreModule {}