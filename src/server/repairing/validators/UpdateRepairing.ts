import { Type } from 'class-transformer';
import { REPAIRING_STATUS } from '@app/shared';
import {
    IsDecimal,
    IsDefined,
    IsIn,
    IsNotEmpty,
    IsNumber,
    ValidateIf,
} from 'class-validator';

export class UpdateRepairing {
    @IsDefined()
    @IsNumber()
    @Type(() => Number)
    repairingId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsIn(Object.values(REPAIRING_STATUS))
    status: number;

    @ValidateIf(({ status }) => status === REPAIRING_STATUS.REPAIRED)
    @IsNotEmpty()
    @IsDecimal()
    actualRepairingCost: number;
}
