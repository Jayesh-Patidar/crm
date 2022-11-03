import { IsDefined, IsString, IsNotEmpty, MaxLength } from '@app/server/core';

export class CreateLocalityValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    localityName: string;
}
