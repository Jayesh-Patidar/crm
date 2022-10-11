import type { RepositoryContract } from './Contract';
import type { TransactionOrKnex } from 'objection';
import { QueryBuilder } from '../QueryBuilder';

export class DatabaseRepository<T extends Record<string, any>>
    implements RepositoryContract<T>
{
    /**
     * The instance of model
     */
    model: any;

    query(
        args?: TransactionOrKnex,
        withSoftDeleted = false,
    ): QueryBuilder<any, any> {
        return this.model
            .query(args)
            .modify((query: QueryBuilder<any, any>) =>
                withSoftDeleted
                    ? query
                    : query.whereNull(
                          `${query['_modelClass'].tableName}.deleted_at`,
                      ),
            );
    }

    async firstOrCreate(
        condition: Record<string, any>,
        data: Record<string, any>,
    ): Promise<T> {
        const record = await this.query().where(condition).first();

        if (record) {
            return record;
        }

        return this.query().insertAndFetch({ ...condition, ...data });
    }
}
