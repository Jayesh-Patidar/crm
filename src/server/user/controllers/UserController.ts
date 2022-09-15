import { UserService } from '../services';
import type { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    async getAllUsers(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        return res.json({
            data: await this.userService.getAllUser(),
        });
    }
}
