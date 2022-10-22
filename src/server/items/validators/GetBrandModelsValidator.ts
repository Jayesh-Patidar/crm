import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    GetRecordValidator,
} from '@app/server/core';
import { Type } from 'class-transformer';

export class GetBrandModelsValidator extends GetRecordValidator {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    brandId: number;
}
