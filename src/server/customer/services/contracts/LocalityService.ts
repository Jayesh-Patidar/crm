import { Locality, Pagination } from '@app/shared';
import { ICreateLocality, IGetLocalities } from '../../interfaces';

export interface LocalityServiceContract {
    getLocalities(inputs: IGetLocalities): Promise<Pagination<Locality>>;
    createLocality(inputs: ICreateLocality): Promise<Locality>;
}
