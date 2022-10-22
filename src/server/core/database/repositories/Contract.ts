import type { QueryBuilder, TransactionOrKnex } from 'objection';

export interface RepositoryContract<T extends Record<string, any>> {
    model: any;

    /**
     * Get new instance of model.
     */
    query(
        args?: TransactionOrKnex,
        withSoftDeleted?: boolean,
    ): QueryBuilder<any, any>;

    /**
     * Get the first instance or create and return a new instance.
     */
    firstOrCreate(
        condition?: Record<string, any>,
        data?: Record<string, any>,
    ): Promise<T>;
}
