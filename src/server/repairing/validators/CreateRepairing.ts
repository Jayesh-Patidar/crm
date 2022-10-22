import {
    IsDefined,
    IsString,
    IsOptional,
    IsNotEmpty,
    IsArray,
    IsDateString,
    IsDecimal,
    IsObject,
    ValidateNested,
    ArrayMinSize,
} from '@app/server/core';
import { CreateCustomerValidator } from '@app/server/customer';
import {
    CreateBrandModelValidator,
    CreateBrandValidator,
    CreateIssueValidator,
} from '@app/server/items';
import { Type } from 'class-transformer';

export class CreateRepairingValidator {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateCustomerValidator)
    customer: CreateCustomerValidator;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBrandValidator)
    brand: CreateBrandValidator;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBrandModelValidator)
    brandModel: CreateBrandModelValidator;

    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CreateIssueValidator)
    issues: CreateIssueValidator[];

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    serialNumber: string;

    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    expectedReturnDate: Date;

    @IsDefined()
    @IsNotEmpty()
    @IsDecimal()
    expectedRepairingCost: number;
}
