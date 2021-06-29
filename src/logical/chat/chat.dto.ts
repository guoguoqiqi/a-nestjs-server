import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRecordDto {
  @ApiProperty()
  @IsNotEmpty({ message: '发送人不能为空' })
  readonly accountName: string;
  @ApiProperty()
  @IsNotEmpty({ message: '发送内容不能为空' })
  readonly messageValue: string;
  readonly createTime: string;
  readonly role?: string | number;
}