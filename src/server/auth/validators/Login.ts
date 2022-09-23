import {
    IsDefined,
    IsPhoneNumber,
    IsString,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
} from '@app/server/core';

export class LoginValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    rememberMe: boolean;
}
