import { Type } from 'class-transformer';
import { REPAIRING_STATUS } from '@app/shared';
import {
    IsBoolean,
    IsDecimal,
    IsDefined,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';
import { isUndefined } from 'lodash';

export class UpdateRepairing {
    @IsDefined()
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ValidateIf(({ isPinned }) => isUndefined(isPinned))
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsIn(Object.values(REPAIRING_STATUS))
    status: number;

    @ValidateIf(({ status }) => status === REPAIRING_STATUS.REPAIRED)
    @IsNotEmpty()
    @IsDecimal()
    actualRepairingCost: number;

    @IsOptional()
    @IsBoolean()
    isPinned: boolean;

    @ValidateIf(({ status }) =>
        [REPAIRING_STATUS.UNSERVICEABLE, REPAIRING_STATUS.CANCELLED].includes(
            status,
        ),
    )
    @IsOptional()
    @IsString()
    remarks: string;
}
