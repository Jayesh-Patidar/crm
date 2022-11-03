import { Pagination, RepairingDetails } from '@app/shared';
import {
    ICreateRepairing,
    IGetRepairing,
    IGetRepairingDetails,
    IUpdateRepairing,
} from '../../interfaces';

export interface RepairingServiceContract {
    getRepairing(inputs: IGetRepairing): Promise<Pagination<RepairingDetails>>;
    getRepairingDetails(
        inputs: IGetRepairingDetails,
    ): Promise<RepairingDetails>;
    createRepairing(inputs: ICreateRepairing): Promise<void>;
    updateRepairing(inputs: IUpdateRepairing): Promise<void>;
}
