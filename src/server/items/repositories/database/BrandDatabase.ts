import { Brand } from '../../models';
import { Injectable } from '@nestjs/common';
import { BrandRepositoryContract } from '../contracts';
import { Brand as IBrand, Pagination } from '@app/shared';
import { DatabaseRepository, InjectModel } from '@app/server/core';
import { IGetBrands } from '../../interfaces';

@Injectable()
export class BrandRepositoryDatabase
    extends DatabaseRepository<IBrand>
    implements BrandRepositoryContract
{
    @InjectModel(Brand)
    model: Brand;

    async getBrands(inputs: IGetBrands): Promise<Pagination<IBrand>> {
        const { searchValue, limit, page } = inputs;
        return this.query()
            .modify('searchBrands', searchValue)
            .paginate<IBrand>(page, limit);
    }
}
