import type { IUser } from '../interfaces';
import { USER_REPOSITORY } from '../constants';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryContract } from '../repositories';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepositoryContract,
    ) {}

    async getAllUser(): Promise<Array<IUser>> {
        return this.userRepository.query();
    }
}
