import {Injectable} from '@nestjs/common';

import {SerialPort} from 'serialport';

@Injectable()
export class AppService {
  port: SerialPort;
  getHello(): string {
    return 'Hello World!';
  }
  /**
   * 获取串口列表
   */
  async getPortList(){
    return await SerialPort.list()
  }
  /**
   * 连接指定串口
   * @param path 串口号或者串口路径
   */
  connectPort(path:string){
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({path: path, baudRate: 9600}, (err) => {
        if (err) {
          console.log(`${path} 打开失败`,`------${new Date()}`);
          console.log(`${err}:--------${new Date()}`);
          reject({
            msg:err
          })
        }else{
          console.log(`${path}打开成功`,`-------${new Date()}`);
          resolve({
            msg:`${path} 连接成功`
          })
        }
      })
    })
  }
  /**
   * 关闭串口
   */
  closePort(){
    try {
      this.port.close();
      return '串口关闭'
    }catch (e) {
      console.log(e);
      throw e
    }

  }
  /**
   * 串口写入
   * @param data 
   */
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
  /**
   * 读取串口
   */
  readData(){
    return {
      data:this.port.read(),
      code:200
    }
  }
}
