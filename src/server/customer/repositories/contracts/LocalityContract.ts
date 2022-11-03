import { Locality, Pagination } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetLocalities } from '../../interfaces';

export interface LocalityRepositoryContract
    extends RepositoryContract<Locality> {
    getLocalities(inputs: IGetLocalities): Promise<Pagination<Locality>>;
}
