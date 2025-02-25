import { Injectable, Logger } from '@nestjs/common';

import { SerialPort } from 'serialport';

@Injectable()
export class AppService {
  private port: SerialPort;
  private logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }
  /**
   * 获取串口列表
   */
  getPortList() {
    return SerialPort.list();
  }
  /**
   * 连接指定串口
   * @param path 串口号或者串口路径
   */
  connectPort(path: string) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({ path: path, baudRate: 9600 }, (err) => {
        if (err) {
          this.logger.debug(`${path} 打开失败`, `------${new Date()}`);
          this.logger.debug(`${err}:--------${new Date()}`);
          reject({
            msg: err,
          });
        } else {
          this.logger.debug(`${path}打开成功`, `-------${new Date()}`);
          resolve({
            msg: `${path} 连接成功`,
          });
        }
      });
    });
  }
  /**
   * 关闭串口
   */
  closePort() {
    try {
      this.port.close();
      return '串口关闭';
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /**
   * 串口写入
   * @param data
   */
  writeData(data: Uint8Array) {
    const uint8Array = data;
    return new Promise((resolve, reject) => {
      this.port.write(uint8Array);
      this.port.drain((err) => {
        if (err) {
          console.log(err);
          reject({
            status: err,
            code: 2001,
          });
        }
        resolve({
          status: '写入ok',
          code: 200,
        });
      });
    });
  }
  /**
   * 读取串口
   */
  readData() {
    return {
      data: this.port.read(),
      code: 200,
    };
  }
}
