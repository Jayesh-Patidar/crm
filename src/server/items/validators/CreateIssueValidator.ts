import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateIssueValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    issue: string;
}
