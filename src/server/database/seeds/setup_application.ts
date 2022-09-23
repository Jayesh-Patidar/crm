import { Knex } from 'knex';
import { findIndex, sortBy, uniqBy } from 'lodash';
import { ISSUE_TYPE } from '../../../shared';
import brandDetails from '../../../../laptop.json';

interface Issues {
    issue: string;
    issueType: number;
    approximateTimeToFix: number;
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

    const issues: Issues[] = [
        {
            issue: 'Software update',
            issueType: ISSUE_TYPE.Software,
            approximateTimeToFix: 2,
        },
        {
            issue: 'System format',
            issueType: ISSUE_TYPE.Software,
            approximateTimeToFix: 2,
        },
        {
            issue: 'Black display',
            issueType: ISSUE_TYPE.Hardware,
            approximateTimeToFix: 7,
        },
        {
            issue: 'Ram not working',
            issueType: ISSUE_TYPE.Hardware,
            approximateTimeToFix: 4,
        },
    ];

    queries.push(knex('issues').transacting(transaction).insert(issues));

    await Promise.all(queries)
        .then(transaction.commit)
        .catch((error) => {
            console.error('Error while application setup', error);
            transaction.rollback();
        });
}
