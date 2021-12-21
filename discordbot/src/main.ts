import { NestFactory } from '@nestjs/core';

import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BotModule } from './bot.module';

async function bootstrap() {
  const app = await NestFactory.create(BotModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.BOT_PORT);
  const logger = new Logger('NestApplication');
  logger.log(`Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
