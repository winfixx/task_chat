import { Low } from 'lowdb/lib'
import { IMessagesRepository } from '../../../interfaces/repository/IMessagesRepository'
import { Message } from '../../../models/Message'
import { DataLowDb } from '../db/db'

export class MessagesRepository implements IMessagesRepository {
  constructor(
    private db: Low<DataLowDb>
  ) { }

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const messages = this.db.data.messages
    const messagesByChatId = messages.filter(m => m.chatId === chatId)

    return messagesByChatId
  }

  async addMessageInChat(newMessage: Message): Promise<void> {
    this.db.data.messages.push(newMessage)
    await this.db.write()
  }
}