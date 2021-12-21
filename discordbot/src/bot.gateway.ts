import { Injectable, Logger } from '@nestjs/common';
import {
  Once,
  DiscordClientProvider,
  Client,
  ClientProvider,
  OnCommand,
  On,
  UsePipes,
  TransformPipe,
  Content,
  Context,
} from 'discord-nestjs';
import { Message, TextChannel } from 'discord.js';
import { BotService } from './bot.service';
import { UserDto } from './dto/user.dto';
import { weatherInputDto } from './dto/weatherInput.dto';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly botservice: BotService) {}

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }

  //#region simple stuff
  @OnCommand({ name: 'avatar' })
  @UsePipes(TransformPipe)
  async onCommand(
    @Content() content: UserDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await context.reply(this.botservice.getAvatar(content));
  }
  //#endregion

  //#region test
  @OnCommand({ name: 'test' })
  async onTestCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);

    const client = this.discordProvider.getClient();

    // const channel = await client.channels.fetch(message.channelId);
    // (channel as TextChannel).send('test');

    const test = await this.botservice.getHello(message.content);
    console.log(test);
  }
  //#endregion

  @On({ event: 'message' })
  async onMessage(@Context() [context]: [Message]): Promise<void> {
    if (context.mentions.users.get('886890896925290496')) {
      await context.reply("you talked towards me!");
    }
  }
}
