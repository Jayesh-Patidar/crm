import {
    IsDefined,
    IsPhoneNumber,
    IsString,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateIf,
    IsArray,
} from '@app/server/core';

export class CreateCustomerRecordValidator {
    @ValidateIf(({ customerId }) => !customerId)
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ValidateIf(({ customerId }) => !customerId)
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone: string;
}
