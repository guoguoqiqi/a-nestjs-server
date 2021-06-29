import { Controller, Get, Post, Body, UseGuards, UsePipes, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';

import { ValidationPipe } from '../../pipe/validation.pipe';
import { ChatRecordDto } from './chat.dto'; // 引入 DTO


import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatRecordPageDto } from './chatRecordPage.dto';

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('chat') // 添加 接口标签 装饰器
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) { }

  // 路由测试
  @Get('test')
  async test() {
    return {
      code: 1,
      data: 'test router'
    }
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Get('get-record')
  async getChatRecord(@Query() query: ChatRecordPageDto) {
    const getRecordParams = {
      pageIndex: Number(query.pageIndex),
      pageSize: Number(query.pageSize)
    }
    return this.chatService.getChatRecord(getRecordParams)
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('send')
  async sendMessage(@Body() sendParams: ChatRecordDto) {
    return this.chatService.sendMessage(sendParams)
  }
}