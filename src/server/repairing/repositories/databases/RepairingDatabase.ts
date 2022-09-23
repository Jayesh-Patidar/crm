import { Repairing } from '../../models';
import { Injectable } from '@nestjs/common';
import { Repairing as IRepairing } from '@app/shared';
import { RepairingRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';
import { IGetRepairingRecords } from '../../interfaces';

@Injectable()
export class RepairingRepositoryDatabase
    extends DatabaseRepository<IRepairing>
    implements RepairingRepositoryContract
{
    @InjectModel(Repairing)
    model: Repairing;

    getRepairingRecords(inputs: IGetRepairingRecords) {
        const { limit } = inputs;
        return Repairing.query()
            .withGraphJoined(
                `[
                customer(defaultSelects),
                brand(defaultSelects),
                brandModel(defaultSelects),
                issues(defaultSelects),
            ]`,
            )
            .limit(limit);
    }
}
