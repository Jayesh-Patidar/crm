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

export class CreateRepairingRecordValidator {
    @ValidateIf(({ customerPhone }) => !customerPhone)
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @ValidateIf(({ customerId }) => !customerId)
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    customerFirstName: string;

    @ValidateIf(({ customerId }) => !customerId)
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    customerLastName: string;

    @ValidateIf(({ customerId }) => !customerId)
    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    customerPhone: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    brandId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    brandModelId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    issueIds: number[];
}
