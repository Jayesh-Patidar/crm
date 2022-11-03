import { Accessory, Pagination } from '@app/shared';
import { IGetAccessories, ICreateAccessory } from '../../interfaces';

export interface AccessoryServiceContract {
    getAccessories(inputs: IGetAccessories): Promise<Pagination<Accessory>>;
    createAccessory(inputs: ICreateAccessory): Promise<Accessory>;
}
