import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('users').insert({
        firstName: 'Jayesh',
        lastName: 'Patidar',
        phone: 7987639680,
        password:
            '$2a$10$dNB.PDqp4aulvukIcZ2pQuESDHV19H14VgXe9Rmeai/W.X0FLKD4C', // password
        role: 1,
    });
}
