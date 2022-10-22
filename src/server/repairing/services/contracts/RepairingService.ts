import { Pagination, RepairingDetails } from '@app/shared';
import {
    ICreateRepairing,
    IGetRepairing,
    IUpdateRepairing,
} from '../../interfaces';

export interface RepairingServiceContract {
    getRepairing(inputs: IGetRepairing): Promise<Pagination<RepairingDetails>>;
    createRepairing(inputs: ICreateRepairing): Promise<void>;
    updateRepairing(inputs: IUpdateRepairing): Promise<void>;
}
