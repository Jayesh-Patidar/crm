import { Brand } from '../../models';
import { Injectable } from '@nestjs/common';
import { BrandRepositoryContract } from '../contracts';
import { Brand as IBrand } from '@app/shared';
import { DatabaseRepository, InjectModel } from '@app/server/core';
import { IBrandsForDropdown } from '../../interfaces';

@Injectable()
export class BrandRepositoryDatabase
    extends DatabaseRepository<IBrand>
    implements BrandRepositoryContract
{
    @InjectModel(Brand)
    model: Brand;

    async getBrandsForDropdown(inputs: IBrandsForDropdown): Promise<IBrand[]> {
        const { searchValue } = inputs;
        return this.query()
            .modify((query) => {
                if (searchValue) {
                    query.where('brandName', 'like', `%${searchValue}%`);
                }
            })
            .limit(10);
    }
}
