import { sign } from 'jsonwebtoken';
import { env } from '@app/server/core';
import { compareSync } from 'bcryptjs';
import { Validator } from '@app/server/core';
import { LoginValidator } from '../validators';
import { USER_REPOSITORY } from '@app/server/user';
import type { ILoginRequest } from '../interfaces';
import type { LoginServiceContract } from './contracts';
import type { UserRepositoryContract } from '@app/server/user';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LoginService implements LoginServiceContract {
    constructor(
        private validator: Validator,
        @Inject(USER_REPOSITORY) private userRepository: UserRepositoryContract,
    ) {}

    async login(inputs: ILoginRequest) {
        await this.validator.validate(inputs, LoginValidator);

        const { phone, password } = inputs;
        const [, phoneNumber] = phone.split(' ');

        const user = await this.userRepository
            .query()
            .where('phone', phoneNumber)
            .first();

        if (!user) {
            throw new HttpException(
                'No record match our database',
                HttpStatus.NOT_FOUND,
            );
        }

        if (!compareSync(password, user.password)) {
            throw new HttpException(
                'You made an wrong password attempt',
                HttpStatus.BAD_REQUEST,
            );
        }

        delete user.password;

        return { ...user, accessToken: sign({ id: user.id }, env('APP_KEY')) };
    }
}
