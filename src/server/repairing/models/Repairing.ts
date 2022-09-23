import { Model } from '@app/server/core';
import { Customer } from '@app/server/customer';
import { Brand, BrandModel, Issue } from '@app/server/items';
import { RelationMappings, RelationMappingsThunk } from 'objection';
import { RepairingIssue } from './RepairingIssue';

export class Repairing extends Model {
    static tableName: string = 'repairing';

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        customer: {
            relation: Model.BelongsToOneRelation,
            modelClass: Customer,
            join: {
                from: 'repairing.customer_id',
                to: 'customers.id',
            },
        },

        brand: {
            relation: Model.BelongsToOneRelation,
            modelClass: Brand,
            join: {
                from: 'repairing.brand_id',
                to: 'brands.id',
            },
        },

        brandModel: {
            relation: Model.BelongsToOneRelation,
            modelClass: BrandModel,
            join: {
                from: 'repairing.brand_model_id',
                to: 'brand_models.id',
            },
        },

        issues: {
            relation: Model.ManyToManyRelation,
            modelClass: Issue,
            join: {
                from: 'repairing.id',
                through: {
                    from: 'repairing_issues.repairing_id',
                    to: 'repairing_issues.issue_id',
                },
                to: 'issues.id',
            },
        },

        repairingIssues: {
            relation: Model.HasManyRelation,
            modelClass: RepairingIssue,
            join: {
                from: 'repairing.id',
                to: 'repairing_issues.repairing_id',
            },
        },
    };
}
