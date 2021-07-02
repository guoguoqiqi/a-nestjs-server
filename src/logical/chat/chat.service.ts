import { Injectable } from '@nestjs/common';
import * as Moment from 'moment'; // 处理时间的工具
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
import { ChatRecordDto } from './chat.dto';
import { ChatRecordPageDto } from './chatRecordPage.dto';

@Injectable()
export class ChatService {
  /**
   * 查询
   * @param requestParams 请求体
   */
  async getChatRecord(requestParams: ChatRecordPageDto): Promise<any> {
    const { pageIndex, pageSize } = requestParams;

    const insertChatRecord = `
      SELECT * from chat_record limit ${(pageIndex - 1) * pageSize},${pageSize}; 
    `;

    try {
      const chatRecordList = await sequelize.query(insertChatRecord, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: false, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        row: chatRecordList,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  /**
   * 发送
   * @param requestBody 请求体
   */
  async sendMessage(requestBody: ChatRecordDto): Promise<any> {
    const { account_name, real_name, message_value, message_origin, message_type } = requestBody;
    const create_time = Moment().format("YYYY-MM-DD HH:mm:ss");
    const insertChatRecord = `
      INSERT INTO chat_record
        (account_name, real_name, message_value, message_origin, message_type, create_time)
      VALUES
        ('${account_name}', '${real_name}','${message_value}','${message_origin}','${message_type}', '${create_time}')
    `;
    try {
      await sequelize.query(insertChatRecord, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}