import { JSONFilePreset } from 'lowdb/node'

type Message = {
  messageId: string
  userId: string
  senderName: string
  messageText: string
  createdAt: string
}

type Data = {
  messages: Message[]
}

const defaultData: Data = {
  messages: [
    {
      messageId: '1',
      userId: '1',
      senderName: 'Bob',
      messageText: 'What are you doing here?',
      createdAt: '2021-01-14'
    },
    {
      messageId: '2',
      userId: '2',
      senderName: 'Alice',
      messageText: 'Go back to work!',
      createdAt: '2021-02-15'
    }
  ]
}

const db = await JSONFilePreset<Data>('db.json', defaultData)

export default db