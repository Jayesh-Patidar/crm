import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('customers', (table) => {
        table.bigIncrements();
        table.string('firstName', 50).index();
        table.string('lastName', 50).nullable().index();
        table.string('phone', 15).unique().index();
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
    return knex.schema.dropTable('customers');
}
