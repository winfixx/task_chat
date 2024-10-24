import { JSONFilePreset } from 'lowdb/node'

type Message = {
  id: string
  userId: string
  chatId: string
  senderName: string
  messageText: string
  createdAt: Date
}

type Chat = {
  id: string
  createdAt: Date
}

type Data = {
  messages: Message[]
  chats: Chat[]
}

const defaultData: Data = {
  chats: [
    {
      id: '1',
      createdAt: new Date('2021-01-14')
    }
  ],
  messages: [
    {
      id: '1',
      userId: '1',
      chatId: '',
      senderName: 'Bob',
      messageText: 'What are you doing here?',
      createdAt: new Date('2021-01-14')
    },
    {
      id: '2',
      userId: '2',
      chatId: '',
      senderName: 'Alice',
      messageText: 'Go back to work!',
      createdAt: new Date('2021-02-15')
    }
  ]
}

const db = await JSONFilePreset<Data>('db.json', defaultData)

export default db