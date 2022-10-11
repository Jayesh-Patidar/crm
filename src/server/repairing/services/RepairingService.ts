import { CUSTOMER_SERVICE } from '@app/server/customer';
import type { CustomerServiceContract } from '@app/server/customer';
import { uniq } from 'lodash';
import { Validator } from '@app/server/core';
import { Inject, Injectable } from '@nestjs/common';
import type { RepairingServiceContract } from './contracts';
import {
    DATABASE_DATE_TIME_FORMAT,
    getFormattedDateAndTime,
    Pagination,
    RepairingRecord,
    REPAIRING_STATUS,
} from '@app/shared';
import type { RepairingRepositoryContract } from '../repositories';
import {
    CreateRepairingRecordValidator,
    UpdateRepairingRecord,
} from '../validators';
import { REPAIRING_REPOSITORY } from '../constants';
import {
    ICreateRepairingRecord,
    IGetRepairingRecords,
    IUpdateRepairingRecord,
} from '../interfaces';

@Injectable()
export class RepairingService implements RepairingServiceContract {
    constructor(
        private validator: Validator,
        @Inject(REPAIRING_REPOSITORY)
        private repairingRepository: RepairingRepositoryContract,
        @Inject(CUSTOMER_SERVICE)
        private customerService: CustomerServiceContract,
    ) {}

    async getRepairingRecords(
        inputs: IGetRepairingRecords,
    ): Promise<Pagination<RepairingRecord>> {
        const { limit = 20, page = 1 } = inputs;
        return this.repairingRepository.getRepairingRecords({
            ...inputs,
            limit: +limit,
            page: +page,
        });
    }

    async saveRepairingRecord(inputs: ICreateRepairingRecord): Promise<void> {
        await this.validator.validate(inputs, CreateRepairingRecordValidator);

        let customerId = inputs.customerId;
        const {
            customerFirstName,
            customerLastName,
            customerPhone,
            brandId,
            brandModelId,
            issueIds,
            expectedReturnDate,
            expectedRepairingCost,
        } = inputs;

        if (!customerId) {
            const customer = await this.customerService.createCustomer({
                firstName: customerFirstName,
                lastName: customerLastName,
                phone: customerPhone,
            });

            customerId = customer.id;
        }

        await this.repairingRepository.query().insertGraph({
            customerId: customerId,
            brandId: brandId,
            brandModelId: brandModelId,
            status: REPAIRING_STATUS.PENDING,
            expectedRepairingCost,
            expectedReturnDate: getFormattedDateAndTime(
                expectedReturnDate,
                DATABASE_DATE_TIME_FORMAT,
            ),
            repairingIssues: uniq(issueIds).map((issueId) => ({
                issueId: issueId,
            })),
        });
    }

    async updateRepairingRecord(inputs: IUpdateRepairingRecord): Promise<void> {
        await this.validator.validate(inputs, UpdateRepairingRecord);

        const { repairingId, status, actualRepairingCost } = inputs;

        await this.repairingRepository
            .query()
            .update({
                status,
                actualRepairingCost,
                actualReturnDate:
                    (status === REPAIRING_STATUS.REPAIRED &&
                        getFormattedDateAndTime(
                            undefined,
                            DATABASE_DATE_TIME_FORMAT,
                        )) ||
                    null,
            })
            .where({ id: repairingId, status: REPAIRING_STATUS.PENDING });
    }
}
