import { Accessory, Pagination } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetAccessories } from '../../interfaces';

export interface AccessoryRepositoryContract
    extends RepositoryContract<Accessory> {
    getAccessories(inputs: IGetAccessories): Promise<Pagination<Accessory>>;
}
