import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('call-axious')
  async getAxios() {
    let data;
    data = await this.appService.getHello();
    console.log(data);
    return data;
  }

  @Get('')
  getHello() {
    return this.appService.getHello();
  }

  @Get('env')
  getEnvBd() {
    return {env: process.env.BD, hh:'hh'};
  }
}
