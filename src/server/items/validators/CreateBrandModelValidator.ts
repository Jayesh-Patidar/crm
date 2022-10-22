import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateIf,
} from 'class-validator';

export class CreateBrandModelValidator {
    @ValidateIf(({ brandId }) => brandId > 0)
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    brandId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    modelName: string;
}
