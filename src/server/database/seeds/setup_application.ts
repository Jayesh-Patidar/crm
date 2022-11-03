import { Knex } from 'knex';
import { findIndex, sortBy, uniqBy } from 'lodash';
import brandDetails from '../../../../laptop.json';

interface Issue {
    issue: string;
}

export async function seed(knex: Knex): Promise<void> {
    const transaction = await knex.transaction();

    const queries = [];

    queries.push(
        knex('users').transacting(transaction).insert({
            firstName: 'Jayesh',
            lastName: 'Patidar',
            phone: '+91 7987639680',
            password:
                '$2a$10$dNB.PDqp4aulvukIcZ2pQuESDHV19H14VgXe9Rmeai/W.X0FLKD4C', // password
            role: 1,
        }),
    );

    const brands = uniqBy(
        brandDetails.map((item) => ({ brandName: item.Company })),
        'brandName',
    );
    queries.push(knex('brands').transacting(transaction).insert(brands));

    const brandModels = sortBy(
        uniqBy(
            brandDetails.map((item) => ({
                brandId: findIndex(brands, { brandName: item.Company }) + 1,
                modelName: item.Product,
            })),
            'modelName',
        ),
        ['brandId'],
    );
    queries.push(
        knex('brand_models').transacting(transaction).insert(brandModels),
    );

    const issues: Issue[] = [
        {
            issue: 'Software update',
        },
        {
            issue: 'System format',
        },
        {
            issue: 'Black display',
        },
        {
            issue: 'Ram not working',
        },
    ];

    queries.push(knex('issues').transacting(transaction).insert(issues));

    queries.push(
        knex('accessories')
            .transacting(transaction)
            .insert([
                { accessoryName: 'Bag' },
                { accessoryName: 'Charger' },
                { accessoryName: 'Pen drive' },
                { accessoryName: 'Hard disk' },
                { accessoryName: 'Keyboard' },
            ]),
    );

    await Promise.all(queries)
        .then(transaction.commit)
        .catch((error) => {
            console.error('Error while application setup', error);
            transaction.rollback();
        });
}
