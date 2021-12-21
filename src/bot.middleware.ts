import { Middleware, DiscordMiddleware } from 'discord-nestjs';
import { Logger } from '@nestjs/common';
import { ClientEvents } from 'discord.js';

@Middleware()
export class BotMiddleware implements DiscordMiddleware {
  private readonly logger = new Logger(BotMiddleware.name);

  use(event: keyof ClientEvents, context: any[]): void {
    this.logger.log(`${event} + ${context}`);
  }
}
