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
    MaxLength,
    IsPhoneNumber,
    ValidateIf,
} from '@app/server/core';
import {
    CreateCustomerValidator,
    CreateLocalityValidator,
} from '@app/server/customer';
import {
    CreateAccessoryValidator,
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
    @Type(() => CreateLocalityValidator)
    locality: CreateLocalityValidator;

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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAccessoryValidator)
    accessories: CreateAccessoryValidator[];

    @IsOptional()
    @IsString()
    additionalInformation: string;

    @ValidateIf(
        ({ pointOfContactPhone, pointOfContactName }) =>
            pointOfContactPhone || pointOfContactName,
    )
    @IsOptional()
    @IsPhoneNumber('IN')
    @IsString()
    @MaxLength(50)
    pointOfContactPhone: string;

    @ValidateIf(
        ({ pointOfContactName, pointOfContactPhone }) =>
            pointOfContactName || pointOfContactPhone,
    )
    @IsOptional()
    @IsString()
    @MaxLength(50)
    pointOfContactName: string;

    @IsOptional()
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
