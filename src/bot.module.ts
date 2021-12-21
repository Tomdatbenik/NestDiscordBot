import { Module } from '@nestjs/common';
import {
  DiscordModule,
  DiscordModuleOption,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';
import { Intents } from 'discord.js';
import { BotGateway } from './bot.gateway';
import { BotMiddleware } from './bot.middleware';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRoot({
      token: process.env.BOT_TOKEN,
      commandPrefix: '!',
      usePipes: [TransformPipe, ValidationPipe],
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
      ],
    } as DiscordModuleOption),
  ],
  providers: [BotService, BotGateway, BotMiddleware],
})
export class BotModule {}
