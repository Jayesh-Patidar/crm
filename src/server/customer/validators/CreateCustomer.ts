import {
    IsDefined,
    IsPhoneNumber,
    IsString,
    IsOptional,
    IsNotEmpty,
    MaxLength,
} from '@app/server/core';

export class CreateCustomerValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    @MaxLength(15)
    phone: string;
}
