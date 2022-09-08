import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "../services";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    async getAllUsers(@Req() req: Request, @Res() res: Response): Promise<Response> {
        return res.json({
            data: await this.userService.getAllUser()
        })
    }
}