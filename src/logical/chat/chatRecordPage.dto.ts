import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRecordPageDto {
  @ApiProperty()
  @IsNotEmpty({ message: '页码不能为空' })
  readonly pageIndex: number;
  @ApiProperty()
  @IsNotEmpty({ message: '每页数量不能为空' })
  readonly pageSize: number;
}