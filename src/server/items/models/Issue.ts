import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class Issue extends Model {
    static tableName = 'issues';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select(
                'issues.id',
                'issues.issue',
                'issues.issue_type',
                'issues.approximate_time_to_fix',
            );
        },
    };
}
