import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config()

module.exports = {
    client: 'mysql2',
    debug: process.env.DB_DEBUG === 'true' || false,
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || '',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        charset: 'utf8',
    },
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'migrations',
        directory: './src/server/database/migrations',
        stub: './src/server/database/stubs/migration.stub',
        extension: 'ts',
    },
    seeds: {
        directory: './src/server/database/seeds',
        stub: './src/server/database/stubs/seed.stub',
        recursive: true,
    },
    ...knexSnakeCaseMappers(),
} as Knex.Config;
