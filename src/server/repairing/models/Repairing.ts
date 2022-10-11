import { Model } from '@app/server/core';
import { Customer } from '@app/server/customer';
import { RepairingIssue } from './RepairingIssue';
import { Brand, BrandModel, Issue } from '@app/server/items';
import { RelationMappings, RelationMappingsThunk } from 'objection';

export class Repairing extends Model {
    static tableName = 'repairing';

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        customer: {
            relation: Model.BelongsToOneRelation,
            modelClass: Customer,
            join: {
                from: 'repairing.customerId',
                to: 'customers.id',
            },
        },

        brand: {
            relation: Model.BelongsToOneRelation,
            modelClass: Brand,
            join: {
                from: 'repairing.brandId',
                to: 'brands.id',
            },
        },

        brandModel: {
            relation: Model.BelongsToOneRelation,
            modelClass: BrandModel,
            join: {
                from: 'repairing.brandModelId',
                to: 'brand_models.id',
            },
        },

        issues: {
            relation: Model.ManyToManyRelation,
            modelClass: Issue,
            join: {
                from: 'repairing.id',
                through: {
                    from: 'repairing_issues.repairingId',
                    to: 'repairing_issues.issueId',
                },
                to: 'issues.id',
            },
        },

        repairingIssues: {
            relation: Model.HasManyRelation,
            modelClass: RepairingIssue,
            join: {
                from: 'repairing.id',
                to: 'repairing_issues.repairingId',
            },
        },
    };
}
