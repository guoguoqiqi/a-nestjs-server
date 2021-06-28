import { Module } from '@nestjs/common';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { ChatModule } from './logical/chat/chat.module';
import { UserController } from './logical/user/user.controller';

@Module({
  imports: [UserModule, AuthModule, ChatModule],
  providers: [],
  controllers: [UserController],
})
export class AppModule { }