import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('repairing_issues', (table) => {
        table.bigIncrements();
        table.bigInteger('repairing_id').unsigned().notNullable();
        table.bigInteger('issue_id').unsigned().notNullable();
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

        table.foreign('repairing_id').references('id').inTable('repairing');
        table.foreign('issue_id').references('id').inTable('issues');

        table.unique(['repairing_id', 'issue_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('repairing_issues');
}
