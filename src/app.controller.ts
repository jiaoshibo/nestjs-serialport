import {Controller, Get, Param, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('getPortList')
  getPortList(){
    return this.appService.getPortList()
  }
  @Get('openPort/:path')
  async connectPort(@Param('path') path:string){
    return await this.appService.connectPort(path)
  }
  @Get('closePort')
  closePort(){
    return this.appService.closePort()
  }
  @Post('writePort')
  async writePort(@Body() body:{data:Array<number>}){
    return await this.appService.writeData(body.data)
  }
  @Get('readPort')
  async readPort(){
    return await this.appService.readData()
  }
}
