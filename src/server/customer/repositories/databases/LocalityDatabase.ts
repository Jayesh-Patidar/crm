import { Locality } from '../../models';
import { Injectable } from '@nestjs/common';
import { Locality as ILocality, Pagination } from '@app/shared';
import { IGetLocalities } from '../../interfaces';
import { LocalityRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class LocalityRepositoryDatabase
    extends DatabaseRepository<ILocality>
    implements LocalityRepositoryContract
{
    @InjectModel(Locality)
    model: Locality;

    async getLocalities(
        inputs: IGetLocalities,
    ): Promise<Pagination<ILocality>> {
        const { searchValue, page, limit } = inputs;
        return this.query()
            .modify('searchLocalities', searchValue)
            .paginate<ILocality>(page, limit);
    }
}
