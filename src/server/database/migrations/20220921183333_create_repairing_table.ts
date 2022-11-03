import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('repairing', (table) => {
        table.bigIncrements();
        table.bigInteger('customer_id').unsigned().notNullable();
        table.bigInteger('brand_id').unsigned().notNullable();
        table.bigInteger('brand_model_id').unsigned().notNullable();
        table.bigInteger('locality_id').unsigned().notNullable();
        table.string('point_of_contact_name', 100).nullable();
        table.string('point_of_contact_phone', 15).nullable();
        table.string('serial_number', 50).nullable();
        table.text('included_accessories').nullable();
        table.text('additional_information').nullable();
        table
            .specificType('status', 'TINYINT(2)')
            .index()
            .comment('1-Pending,2-Repaired,3-Unserviceable,4-Cancelled');
        table.decimal('expected_repairing_cost', 12, 2);
        table.decimal('actual_repairing_cost', 12, 2).nullable();
        table.timestamp('expected_return_date');
        table.timestamp('actual_return_date').nullable();
        table.boolean('is_pinned').defaultTo(false).index();
        table.string('remarks').nullable();
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
