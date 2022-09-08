import { InjectModel } from '@app/server/core';
import { DatabaseRepository } from '@app/server/core/database/repositories/Database';
import { Injectable } from '@nestjs/common';
import { IUser } from '../../interfaces';
import { User } from '../../models';

@Injectable()
export class UserRepositoryDatabase extends DatabaseRepository<IUser> {
    @InjectModel(User)
    model: User;
}
