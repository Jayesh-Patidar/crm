import { RepairingRecord } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { REPAIRING_REPOSITORY, REPAIRING_STATUS } from '../constants';
import { RepairingServiceContract } from './contracts';
import { RepairingRepositoryContract } from '../repositories';
import { ICreateRepairingRecord, IGetRepairingRecords } from '../interfaces';
import { Validator } from '@app/server/core';
import { CreateRepairingRecordValidator } from '../validators';
import {
    CustomerServiceContract,
    CUSTOMER_SERVICE,
} from '@app/server/customer';
import { uniq } from 'lodash';

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
    ): Promise<RepairingRecord[]> {
        const { limit = 20, offset = 1 } = inputs;
        return this.repairingRepository.getRepairingRecords({
            ...inputs,
            limit,
            offset,
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
            repairingIssues: uniq(issueIds).map((issueId) => ({
                issueId: issueId,
            })),
        });
    }
}
