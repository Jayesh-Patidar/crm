import { Module } from '@nestjs/common';
import { UserService } from './services';
import { USER_REPOSITORY } from './constants';
import { UserController } from './controllers';
import { UserRepositoryDatabase } from './repositories';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        { provide: USER_REPOSITORY, useClass: UserRepositoryDatabase },
    ],
})
export class UserModule {}
