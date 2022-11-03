import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccessoryValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    accessoryName: string;
}
