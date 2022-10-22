import {
    IsDecimal,
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateIssueValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    issue: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    issueType: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    approximateTimeToFix: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    isFixedTime: number;

    @IsOptional()
    @IsNotEmpty()
    @Min(0)
    @IsDecimal()
    approximateCostToFix: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    isFixedCost: number;
}
