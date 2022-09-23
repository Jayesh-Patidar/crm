import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class Issue extends Model {
    static tableName: string = 'issues';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select(
                'id',
                'issue',
                'issue_type',
                'approximate_time_to_fix',
            );
        },
    };
}
