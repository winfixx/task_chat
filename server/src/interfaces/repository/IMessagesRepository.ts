import { Message } from '../../models/Message'

export interface IMessagesRepository {
  getMessagesByChatId(chatId: string): Promise<Message[]>
  addMessageInChat(newMessage: Message): Promise<void>
}