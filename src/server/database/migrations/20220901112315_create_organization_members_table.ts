import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('organization_members', (table) => {
        table.bigIncrements();
        table.bigInteger('organization_id');
        table.string('firstName', 50);
        table.string('lastName', 50).nullable();
        table.string('phone', 15);
        table.specificType('role', 'TINYINT(1)');
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
    return knex.schema.dropTable('organization_members');
}
