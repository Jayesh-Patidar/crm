import { Locality, Pagination } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { LOCALITY_REPOSITORY } from '../constants';
import type { LocalityServiceContract } from './contracts';
import { ICreateLocality, IGetLocalities } from '../interfaces';
import type { LocalityRepositoryContract } from '../repositories';
import { GetRecordValidator, Validator } from '@app/server/core';
import { CreateLocalityValidator } from '../validators';

@Injectable()
export class LocalityService implements LocalityServiceContract {
    constructor(
        private validator: Validator,
        @Inject(LOCALITY_REPOSITORY)
        private localityRepository: LocalityRepositoryContract,
    ) {}

    async getLocalities(inputs: IGetLocalities): Promise<Pagination<Locality>> {
        await this.validator.validate(inputs, GetRecordValidator);

        return this.localityRepository.getLocalities(inputs);
    }

    async createLocality(inputs: ICreateLocality): Promise<Locality> {
        await this.validator.validate(inputs, CreateLocalityValidator);

        const { localityName } = inputs;

        return this.localityRepository.firstOrCreate({ localityName });
    }
}
