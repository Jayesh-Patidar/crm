import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { LOGIN_SERVICE } from './constants';
import { LoginController } from './controllers';
import { LoginService } from './services';

@Module({
    imports: [UserModule],
    controllers: [LoginController],
    providers: [
        {
            provide: LOGIN_SERVICE,
            useClass: LoginService,
        },
    ],
})
export class AuthModule {}
