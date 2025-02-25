import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  // 路由前缀
  // app.setGlobalPrefix('')
  app.enableCors();
  await app.listen(3000);
  logger.log('app is running at port 3000');
}
bootstrap();
