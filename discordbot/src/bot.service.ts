import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);

  async getHello(message: string): Promise<string> {
    return 'Hello World! you send: ' + message;
  }

  getAvatar(content: UserDto): string {
    if (content.user) {
      if (content.user.avatarURL() != null) {
        return `User avatar: ${content.user.avatarURL()}`;
      } else {
        return `${content.user.username} UPLOAD A PICTURE!! AAA`;
      }
    } else {
      return `I need a @user.`;
    }
  }
}
