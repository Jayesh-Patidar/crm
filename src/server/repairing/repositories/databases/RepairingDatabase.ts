import { Repairing } from '../../models';
import { Injectable } from '@nestjs/common';
import {
    Pagination,
    Repairing as IRepairing,
    RepairingRecord,
    REPAIRING_STATUS,
} from '@app/shared';
import { IGetRepairingRecords } from '../../interfaces';
import { RepairingRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class RepairingRepositoryDatabase
    extends DatabaseRepository<IRepairing>
    implements RepairingRepositoryContract
{
    @InjectModel(Repairing)
    model: Repairing;

    async getRepairingRecords(
        inputs: IGetRepairingRecords,
    ): Promise<Pagination<RepairingRecord>> {
        const { limit, page, searchValue } = inputs;
        const repairingRecords = await this.query()
            .withGraphJoined(
                `[
                customer(defaultSelects),
                brand(defaultSelects),
                brandModel(defaultSelects),
            ]`,
            )
            .modify((query) => {
                if (searchValue) {
                    query
                        .where('repairing.id', 'like', `%${searchValue}%`)
                        .orWhere('brand.brandName', 'like', `%${searchValue}%`)
                        .orWhere(
                            'brandModel.modelName',
                            'like',
                            `%${searchValue}%`,
                        )
                        .orWhere(
                            'customer.firstName',
                            'like',
                            `%${searchValue}%`,
                        )
                        .orWhere(
                            'customer.lastName',
                            'like',
                            `%${searchValue}%`,
                        )
                        .orWhere('customer.phone', 'like', `%${searchValue}%`);
                }
            })
            .orderBy('status', 'asc')
            .orderByRaw(
                `CASE
                WHEN repairing.status = ${REPAIRING_STATUS.PENDING}
                THEN repairing.expected_return_date
                WHEN repairing.status = ${REPAIRING_STATUS.REPAIRED}
                THEN repairing.actual_return_date
                ELSE repairing.id
            END ASC`,
            )
            .paginate<RepairingRecord>(page, limit);

        const repairingRecordsWithIssues = await this.query()
            .withGraphFetched(
                `[
                issues(defaultSelects),
            ]`,
            )
            .whereIn(
                'id',
                repairingRecords.records.map(
                    (repairingRecord) => repairingRecord.id,
                ),
            );

        return {
            records: repairingRecords.records.map((repairingRecord) => ({
                ...repairingRecord,
                issues: repairingRecordsWithIssues.find(
                    (repairingIssue: RepairingRecord) =>
                        repairingIssue.id === repairingRecord.id,
                ).issues,
            })),
            pagination: repairingRecords.pagination,
        };
    }
}
