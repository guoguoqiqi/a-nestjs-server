import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRecordDto {
  @ApiProperty()
  @IsNotEmpty({ message: '发送人不能为空' })
  readonly account_name: string;

  @ApiProperty()
  @IsNotEmpty({ message: '发送内容不能为空' })
  readonly real_name: string;

  @ApiProperty()
  @IsNotEmpty({ message: '发送内容不能为空' })
  readonly message_value: string;

  @ApiProperty()
  @IsNotEmpty({ message: '发送内容不能为空' })
  readonly message_origin: string;

  @ApiProperty()
  @IsNotEmpty({ message: '发送内容不能为空' })
  readonly message_type: string;

  readonly create_time: string;
}