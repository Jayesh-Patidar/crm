import { RepositoryContract } from '@app/server/core';
import { IGetRepairingRecords } from '../../interfaces';
import { Pagination, Repairing, RepairingRecord } from '@app/shared';

export interface RepairingRepositoryContract
    extends RepositoryContract<Repairing> {
    getRepairingRecords(
        inputs: IGetRepairingRecords,
    ): Promise<Pagination<RepairingRecord>>;
}
