import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('')
export class AppController {
  @Get() 
  sayHello() {
    return 'Hello, User';
  }
  constructor() {}
}
