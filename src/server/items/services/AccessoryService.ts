import { Accessory, Pagination } from '@app/shared';
import { GetRecordValidator, Validator } from '@app/server/core';
import { Inject, Injectable } from '@nestjs/common';
import { ACCESSORY_REPOSITORY } from '../constants';
import { IGetAccessories, ICreateAccessory } from '../interfaces';
import type { AccessoryRepositoryContract } from '../repositories';
import type { AccessoryServiceContract } from './contracts';
import { CreateAccessoryValidator } from '../validators';

@Injectable()
export class AccessoryService implements AccessoryServiceContract {
    constructor(
        private validator: Validator,
        @Inject(ACCESSORY_REPOSITORY)
        private accessoryRepository: AccessoryRepositoryContract,
    ) {}

    async getAccessories(
        inputs: IGetAccessories,
    ): Promise<Pagination<Accessory>> {
        await this.validator.validate(inputs, GetRecordValidator);

        return this.accessoryRepository.getAccessories(inputs);
    }

    async createAccessory(inputs: ICreateAccessory): Promise<Accessory> {
        await this.validator.validate(inputs, CreateAccessoryValidator);

        return this.accessoryRepository.firstOrCreate(inputs);
    }
}
