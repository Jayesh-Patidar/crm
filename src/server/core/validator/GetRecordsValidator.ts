import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetRecordValidator {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    searchValue: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;
}
