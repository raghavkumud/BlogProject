import { Controller, Get, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
@Controller('users')
export class UserController {
    constructor() { }
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user : User) {
        return user;
    }
}
