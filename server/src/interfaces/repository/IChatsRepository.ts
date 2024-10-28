import { Chat } from '../../models/Chat'

export interface IChatsRepository {
  getChats(): Promise<Chat[]>
}