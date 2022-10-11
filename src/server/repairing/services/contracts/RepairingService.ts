import { Pagination, RepairingRecord } from '@app/shared';
import {
    ICreateRepairingRecord,
    IGetRepairingRecords,
    IUpdateRepairingRecord,
} from '../../interfaces';

export interface RepairingServiceContract {
    getRepairingRecords(
        inputs: IGetRepairingRecords,
    ): Promise<Pagination<RepairingRecord>>;
    saveRepairingRecord(inputs: ICreateRepairingRecord): Promise<void>;
    updateRepairingRecord(inputs: IUpdateRepairingRecord): Promise<void>;
}
