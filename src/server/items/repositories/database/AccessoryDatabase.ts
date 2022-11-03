import { Accessory } from '../../models';
import { Injectable } from '@nestjs/common';
import { AccessoryRepositoryContract } from '../contracts';
import { Accessory as IAccessory, Pagination } from '@app/shared';
import { DatabaseRepository, InjectModel } from '@app/server/core';
import { IGetAccessories } from '../../interfaces';

@Injectable()
export class AccessoryRepositoryDatabase
    extends DatabaseRepository<IAccessory>
    implements AccessoryRepositoryContract
{
    @InjectModel(Accessory)
    model: Accessory;

    async getAccessories(
        inputs: IGetAccessories,
    ): Promise<Pagination<IAccessory>> {
        const { searchValue, limit, page } = inputs;
        return this.query()
            .modify('searchAccessories', searchValue)
            .paginate<IAccessory>(page, limit);
    }
}
