import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.bigIncrements('id', { primaryKey: true });
        table.string('first_name', 50);
        table.string('last_name', 50).nullable();
        table.string('phone', 15);
        table.string('password').nullable();
        table.specificType('role_id', 'TINYINT(1)').comment('1-Admin');
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
    return knex.schema.dropTable('users');
}
