import { Repairing } from '../../models';
import { Injectable } from '@nestjs/common';
import {
    DATABASE_DATE_TIME_FORMAT,
    Pagination,
    Repairing as IRepairing,
    RepairingDetails,
    REPAIRING_STATUS,
} from '@app/shared';
import { IGetRepairing, IGetRepairingDetails } from '../../interfaces';
import type { RepairingRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';
import moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RepairingRepositoryDatabase
    extends DatabaseRepository<IRepairing>
    implements RepairingRepositoryContract
{
    @InjectModel(Repairing)
    model: Repairing;

    constructor(private config: ConfigService) {
        super();
    }

    async getRepairing(
        inputs: IGetRepairing,
    ): Promise<Pagination<RepairingDetails>> {
        const { limit, page, searchValue, status } = inputs;

        const { defaultReturnDateDuration } = this.config.get('setting');

        const repairingRecords = await this.query()
            .withGraphJoined(
                `[
                    customer(defaultSelects),
                    locality(defaultSelects),
                    brand(defaultSelects),
                    brandModel(defaultSelects),
                ]`,
            )
            .where('repairing.status', status || REPAIRING_STATUS.PENDING)
            .modify((query) => {
                if (searchValue) {
                    query.where((query) => {
                        query
                            .where('repairing.id', 'like', `%${searchValue}%`)
                            .orWhere(
                                'repairing.serialNumber',
                                'like',
                                `%${searchValue}%`,
                            )
                            .orWhere(
                                'brand.brandName',
                                'like',
                                `%${searchValue}%`,
                            )
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
                            .orWhere(
                                'customer.phone',
                                'like',
                                `%${searchValue}%`,
                            );
                    });
                }
            })
            .modify((query) => {
                if (!status && !searchValue) {
                    query.whereRaw(`
                        CASE
                            WHEN repairing.is_pinned = 1
                            THEN TRUE
                            ELSE repairing.expected_return_date BETWEEN
                                '${moment()
                                    .subtract(defaultReturnDateDuration, 'days')
                                    .startOf('day')
                                    .format(DATABASE_DATE_TIME_FORMAT)}'
                                AND '${moment()
                                    .add(defaultReturnDateDuration, 'days')
                                    .endOf('day')
                                    .format(DATABASE_DATE_TIME_FORMAT)}'
                        END
                    `);
                }
            })
            .orderBy('repairing.status', 'asc')
            .orderByRaw(
                `CASE
                    WHEN repairing.status = ${REPAIRING_STATUS.PENDING}
                        THEN repairing.expected_return_date
                    WHEN repairing.status = ${REPAIRING_STATUS.REPAIRED}
                        THEN repairing.actual_return_date
                    ELSE repairing.id
                END ASC`,
            )
            .paginate<RepairingDetails>(page, limit);

        const repairingRecordsWithIssues = await this.query()
            .withGraphFetched(
                `[
                    issues(defaultSelects),
                ]`,
            )
            .whereIn(
                'repairing.id',
                repairingRecords.records.map(
                    (repairingRecord) => repairingRecord.id,
                ),
            );

        return {
            records: repairingRecords.records.map((repairingRecord) => ({
                ...repairingRecord,
                issues: repairingRecordsWithIssues.find(
                    (repairingIssue: RepairingDetails) =>
                        repairingIssue.id === repairingRecord.id,
                ).issues,
            })),
            pagination: repairingRecords.pagination,
        };
    }

    async getRepairingDetails(
        inputs: IGetRepairingDetails,
    ): Promise<RepairingDetails> {
        const { id } = inputs;

        return this.query()
            .withGraphFetched(
                `[
                    customer(defaultSelects),
                    locality(defaultSelects),
                    brand(defaultSelects),
                    brandModel(defaultSelects),
                    issues(defaultSelects),
                ]`,
            )
            .findById(id);
    }
}
