import { RepairingRecord } from '@app/shared';
import { ICreateRepairingRecord, IGetRepairingRecords } from '../../interfaces';

export interface RepairingServiceContract {
    getRepairingRecords(
        inputs: IGetRepairingRecords,
    ): Promise<RepairingRecord[]>;
    saveRepairingRecord(inputs: ICreateRepairingRecord): Promise<void>;
}
