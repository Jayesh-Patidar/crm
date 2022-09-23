import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('repairing', (table) => {
        table.bigIncrements();
        table.bigInteger('customer_id').unsigned().notNullable();
        table.bigInteger('brand_id').unsigned().notNullable();
        table.bigInteger('brand_model_id').unsigned().notNullable();
        table.specificType('status', 'TINYINT(2)').comment('');
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

        table.foreign('customer_id').references('id').inTable('customers');
        table.foreign('brand_id').references('id').inTable('brands');
        table
            .foreign('brand_model_id')
            .references('id')
            .inTable('brand_models');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('repairing');
}