import type { QueryBuilder, TransactionOrKnex } from 'objection';

export interface RepositoryContract<T extends Record<string, any>> {
    model: any;

    /**
     * Get new instance of model
     */
    query(
        args?: TransactionOrKnex,
        withSoftDeleted?: boolean,
    ): QueryBuilder<any, any>;
}
