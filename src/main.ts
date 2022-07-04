import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT: string = process.env.SERVER_PORT ?? '3000';
  app.listen(PORT, () => console.log(`Running at port ${PORT}`));
}
bootstrap();
