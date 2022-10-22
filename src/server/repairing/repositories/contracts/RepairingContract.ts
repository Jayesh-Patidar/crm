import { RepositoryContract } from '@app/server/core';
import { IGetRepairing } from '../../interfaces';
import { Pagination, Repairing, RepairingDetails } from '@app/shared';

export interface RepairingRepositoryContract
    extends RepositoryContract<Repairing> {
    getRepairing(inputs: IGetRepairing): Promise<Pagination<RepairingDetails>>;
}
