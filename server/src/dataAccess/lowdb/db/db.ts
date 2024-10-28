import { JSONFilePreset } from 'lowdb/node'
import { Message } from '../../../models/Message'
import { Chat } from '../../../models/Chat'

export type DataLowDb = {
  messages: Message[]
  chats: Chat[]
}

const defaultData: DataLowDb = {
  chats: [
    {
      id: '1',
      createdAt: new Date('2021-01-14')
    },
    {
      id: '2',
      createdAt: new Date('2021-01-14')
    }
  ],
  messages: []
}

const db = await JSONFilePreset<DataLowDb>('./db.json', defaultData)

export default db