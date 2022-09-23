import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('brand_models', (table) => {
        table.bigIncrements();
        table.bigInteger('brand_id').unsigned().notNullable();
        table.string('model_name');
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table
            .timestamp('updated_at')
            .notNullable()
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
        table.timestamp('deleted_at').nullable().index();

        table.foreign('brand_id').references('id').inTable('brands');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('brand_models');
}
