import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    brandName: string;
}
