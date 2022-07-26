import {Injectable} from '@nestjs/common';

import {SerialPort} from 'serialport';

@Injectable()
export class AppService {
  port: SerialPort;
  getHello(): string {
    return 'Hello World!';
  }

  async getPortList(){
    return await SerialPort.list()
  }

  connectPort(path:string){
    let responseData:{
      status:boolean;
      code:number
    } = {
      status:false,
      code:200
    }
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({path: path, baudRate: 9600}, (err) => {
        if (err) {
          console.log(`${path} 打开失败`);
          responseData.code = 2001;
          responseData.status = false;
          reject(responseData)
        }
        responseData.code = 200;
        responseData.status = true;
        resolve(responseData)
      })
    })
  }

  closePort(){
    this.port.close();
    return true
  }

  writeData(data:Array<number>){
    let uint8Array = new Uint8Array(data)
    return new Promise((resolve,reject)=>{
      this.port.write(uint8Array)
      this.port.drain(err=>{
        if(err){
          console.log(err)
          reject({
            status:err,
            code:2001
          })
        }
        resolve({
          status:'写入ok',
          code:200
        })
      })
    })
  }

  readData(){
    return {
      data:this.port.read(),
      code:200
    }
  }
}
