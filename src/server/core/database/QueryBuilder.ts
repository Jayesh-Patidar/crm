import { Pagination } from '@app/shared';
import { Model, Page, QueryBuilder as BaseQueryBuilder } from 'objection';

export class QueryBuilder<M extends Model, R = M[]> extends BaseQueryBuilder<
    M,
    R
> {
    ArrayQueryBuilderType!: QueryBuilder<M, M[]>;
    SingleQueryBuilderType!: QueryBuilder<M, M>;
    MaybeSingleQueryBuilderType!: QueryBuilder<M, M | undefined>;
    NumberQueryBuilderType!: QueryBuilder<M, number>;
    PageQueryBuilderType!: QueryBuilder<M, Page<M>>;

    async paginate<T>(page = 1, limit = 20): Promise<Pagination<T>> {
        const { results: records, total } = await this.page(page - 1, limit);

        const totalPages = Math.ceil(total / limit);

        return {
            records: records as unknown as T[],
            pagination: {
                previousPage: page - 1 || null,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                totalPages,
                limit,
                total: total,
            },
        };
    }
}
