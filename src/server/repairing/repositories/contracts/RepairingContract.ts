import { Repairing } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetRepairingRecords } from '../../interfaces';

export interface RepairingRepositoryContract
    extends RepositoryContract<Repairing> {
    getRepairingRecords(inputs: IGetRepairingRecords);
}
