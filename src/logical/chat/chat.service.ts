import { Injectable } from '@nestjs/common';
import * as Moment from 'moment'; // 处理时间的工具
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';

@Injectable()
export class ChatService {
  /**
   * 发送
   * @param requestBody 请求体
   */
  async sendMessage(requestBody: any): Promise<any> {
    const { accountName, messageValue } = requestBody;
    const createTime = Moment().format("YYYY-MM-DD HH:mm:ss");
    const insertChatRecord = `
      INSERT INTO chat_record
        (account_name, message_value, create_time)
      VALUES
        ('${accountName}', '${messageValue}', '${createTime}')
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