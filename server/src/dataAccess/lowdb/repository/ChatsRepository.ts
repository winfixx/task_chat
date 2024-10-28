import { Low } from 'lowdb/lib'
import { IChatsRepository } from '../../../interfaces/repository/IChatsRepository'
import { Chat } from '../../../models/Chat'
import { DataLowDb } from '../db/db'

export class ChatsRepository implements IChatsRepository {
  constructor(
    private db: Low<DataLowDb>
  ) { }

  async getChats(): Promise<Chat[]> {
    return this.db.data.chats
  }
}