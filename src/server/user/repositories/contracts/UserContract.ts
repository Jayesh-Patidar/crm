import { RepositoryContract } from '@app/server/core';
import { IUser } from '../../interfaces';

export interface UserRepositoryContract extends RepositoryContract<IUser> {}
