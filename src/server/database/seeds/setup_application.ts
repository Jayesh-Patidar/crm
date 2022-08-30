import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('users').insert({
        firstName: 'Jayesh',
        lastName: 'Patidar',
        phone: 7987639680,
        password: 'fdsdjkaslkja',
        roleId: 1,
    });
}
