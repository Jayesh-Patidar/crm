import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('brands', (table) => {
        table.bigIncrements();
        table.string('brand_name', 50).unique();
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
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('brands');
}
