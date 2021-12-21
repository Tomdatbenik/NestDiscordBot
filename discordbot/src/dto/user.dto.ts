import { ArgNum, TransformToUser } from 'discord-nestjs';
import { Expose } from 'class-transformer';
import { User } from 'discord.js';

export class UserDto {
  @ArgNum((last: number) => ({ position: 1 }))
  @Expose()
  @TransformToUser()
  user: User;
}