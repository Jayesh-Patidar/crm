import { User } from '../../models';
import { Injectable } from '@nestjs/common';
import type { IUser } from '../../interfaces';
import type { UserRepositoryContract } from '../contracts';
import { InjectModel, DatabaseRepository } from '@app/server/core';

@Injectable()
export class UserRepositoryDatabase
    extends DatabaseRepository<IUser>
    implements UserRepositoryContract
{
    @InjectModel(User)
    model: User;
}
