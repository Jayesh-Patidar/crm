import { difference, uniqBy } from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_SERVICE, LOCALITY_SERVICE } from '@app/server/customer';
import type {
    CustomerServiceContract,
    LocalityServiceContract,
} from '@app/server/customer';
import { GetRecordValidator, Validator } from '@app/server/core';
import type { RepairingServiceContract } from './contracts';
import {
    DATABASE_DATE_TIME_FORMAT,
    getFormattedDateAndTime,
    Pagination,
    RepairingDetails,
    REPAIRING_STATUS,
} from '@app/shared';
import type { RepairingRepositoryContract } from '../repositories';
import { CreateRepairingValidator, UpdateRepairing } from '../validators';
import { REPAIRING_REPOSITORY } from '../constants';
import {
    ICreateRepairing,
    IGetRepairing,
    IGetRepairingDetails,
    IUpdateRepairing,
} from '../interfaces';
import {
    BRAND_SERVICE,
    BRAND_MODEL_SERVICE,
    ISSUE_SERVICE,
    ACCESSORY_SERVICE,
} from '@app/server/items/constants';
import type {
    BrandServiceContract,
    BrandModelServiceContract,
    IssueServiceContract,
    AccessoryServiceContract,
} from '@app/server/items';

@Injectable()
export class RepairingService implements RepairingServiceContract {
    constructor(
        private validator: Validator,
        @Inject(REPAIRING_REPOSITORY)
        private repairingRepository: RepairingRepositoryContract,
        @Inject(CUSTOMER_SERVICE)
        private customerService: CustomerServiceContract,
        @Inject(LOCALITY_SERVICE)
        private localityService: LocalityServiceContract,
        @Inject(BRAND_SERVICE)
        private brandService: BrandServiceContract,
        @Inject(BRAND_MODEL_SERVICE)
        private brandModelService: BrandModelServiceContract,
        @Inject(ISSUE_SERVICE)
        private issueService: IssueServiceContract,
        @Inject(ACCESSORY_SERVICE)
        private accessoryService: AccessoryServiceContract,
    ) {}

    async getRepairing(
        inputs: IGetRepairing,
    ): Promise<Pagination<RepairingDetails>> {
        await this.validator.validate(inputs, GetRecordValidator);

        const { limit = 20, page = 1 } = inputs;

        return this.repairingRepository.getRepairing({
            ...inputs,
            limit: +limit,
            page: +page,
        });
    }

    async getRepairingDetails(
        inputs: IGetRepairingDetails,
    ): Promise<RepairingDetails> {
        return this.repairingRepository.getRepairingDetails(inputs);
    }

    async createRepairing(inputs: ICreateRepairing): Promise<void> {
        await this.validator.validate(inputs, CreateRepairingValidator);

        let {
            customer,
            locality,
            brand,
            brandModel,
            issues,
            accessories = [],
        } = inputs;

        const {
            pointOfContactName,
            pointOfContactPhone,
            serialNumber,
            additionalInformation,
            expectedReturnDate,
            expectedRepairingCost,
        } = inputs;

        [customer, locality, brand] = await Promise.all([
            !customer.id
                ? this.customerService.createCustomer(customer)
                : customer,
            !locality.id
                ? this.localityService.createLocality(locality)
                : locality,
            !brand.id ? this.brandService.createBrand(brand) : brand,
        ]);

        brandModel = !brandModel.id
            ? await this.brandModelService.createBrandModel({
                  ...brandModel,
                  brandId: brand.id,
              })
            : brandModel;

        const newIssues = issues.filter((issue) => !issue.id);

        if (newIssues.length) {
            issues = difference(issues, newIssues);

            issues.push(
                ...(await Promise.all(
                    newIssues.map((issue) =>
                        this.issueService.createIssue(issue),
                    ),
                )),
            );
        }

        const newAccessories = accessories.filter((accessory) => !accessory.id);

        if (newAccessories.length) {
            accessories = difference(accessories, newAccessories);

            accessories.push(
                ...(await Promise.all(
                    newAccessories.map((accessory) =>
                        this.accessoryService.createAccessory(accessory),
                    ),
                )),
            );
        }

        await this.repairingRepository.query().insertGraph({
            customerId: customer.id,
            brandId: brand.id,
            brandModelId: brandModel.id,
            localityId: locality.id,
            pointOfContactName,
            pointOfContactPhone,
            serialNumber,
            includedAccessories: accessories
                .map((accessory) => accessory.accessoryName)
                .join(', '),
            additionalInformation,
            status: REPAIRING_STATUS.PENDING,
            expectedRepairingCost,
            expectedReturnDate: getFormattedDateAndTime(
                expectedReturnDate,
                DATABASE_DATE_TIME_FORMAT,
            ),
            repairingIssues: uniqBy(issues, 'issue').map((issue) => ({
                issueId: issue.id,
            })),
        });
    }

    async updateRepairing(inputs: IUpdateRepairing): Promise<void> {
        await this.validator.validate(inputs, UpdateRepairing);

        const { id, status, actualRepairingCost, isPinned, remarks } = inputs;

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
                isPinned,
                remarks,
            })
            .where({ id, status: REPAIRING_STATUS.PENDING });
    }
}
