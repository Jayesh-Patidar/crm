import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('issues', (table) => {
        table.bigIncrements();
        table.string('issue');
        table
            .specificType('issue_type', 'TINYINT(1)')
            .nullable()
            .comment('1-Hardware, 2-Software');
        table.integer('approximate_time_to_fix').nullable().comment('In hours');
        table.boolean('is_fixed_time').defaultTo(false);
        table.decimal('approximate_cost_to_fix', 12, 2).nullable();
        table.boolean('is_fixed_cost').defaultTo(false);
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
    return knex.schema.dropTable('issues');
}
