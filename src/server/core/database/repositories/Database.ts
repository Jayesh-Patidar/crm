import type { RepositoryContract } from './Contract';
import type { QueryBuilder, TransactionOrKnex } from 'objection';

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
            .modify((query) =>
                withSoftDeleted ? query : query.whereNull('deleted_at'),
            );
    }
}
