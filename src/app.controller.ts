import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('getPortList')
  getPortList() {
    return this.appService.getPortList();
  }
  @Get('openPort/:path')
  async connectPort(@Param('path') path: string) {
    try {
      return await this.appService.connectPort(path);
    } catch (e) {
      console.log(e, '------connectPort-----');
      return e.msg.message;
    }
  }
  @Get('closePort')
  closePort() {
    return this.appService.closePort();
  }
  @Post('writePort')
  writePort(@Body() body: { data: Uint8Array }) {
    return this.appService.writeData(body.data);
  }
  @Get('readPort')
  async readPort() {
    return this.appService.readData();
  }
}
