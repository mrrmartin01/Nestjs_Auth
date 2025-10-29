import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


//Put this on top of the controller to protect all its routes
// @UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

// Put this on top of specific routes to protect them
  // @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Here's a public route that doesn't need protection
  @Get('public')
  getPublic(): string {
    return 'This is a public route';
  }

}
