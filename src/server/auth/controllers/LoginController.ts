import {
    Controller,
    Inject,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { LOGIN_SERVICE } from '../constants';
import type { ILoginRequest } from '../interfaces';
import { ApiController } from '@app/server/core/controllers';
import type { Request, Response } from '@app/server/core/interfaces';
import type { LoginServiceContract } from '../services/contracts';

@Controller('login')
export class LoginController extends ApiController {
    constructor(
        @Inject(LOGIN_SERVICE)
        private loginService: LoginServiceContract,
    ) {
        super();
    }

    @Post()
    async login(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const inputs = req.all();

        const loggedInUser = await this.loginService.login(
            inputs as ILoginRequest,
        );

        return res.success(loggedInUser);
    }
}
