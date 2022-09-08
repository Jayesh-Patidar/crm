import { IUser } from '../interfaces';
import { USER_REPOSITORY } from '../constants';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryDatabase } from '../repositories/database';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepositoryDatabase,
    ) {}

    async getAllUser(): Promise<IUser[]> {
        return this.userRepository.query();
    }
}
