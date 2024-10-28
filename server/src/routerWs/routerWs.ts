import { Application } from 'express-ws'
import { Guid } from 'js-guid'
import { Server } from 'ws'
import { ConnectionInChatDto } from '../dto/ConnectionInChatDto'
import { GetMessageWsWithType } from '../dto/GetMessageWsWithType'
import { GetNewMessageInChatDto } from '../dto/GetNewMessageInChatDto'
import { SendMessageWsWithType } from '../dto/SendMessageWsWithType'
import { UnConnectionInChatDto } from '../dto/UnConnectionInChatDto'
import { IChatsRepository } from '../interfaces/repository/IChatsRepository'
import { IMessagesRepository } from '../interfaces/repository/IMessagesRepository'
import { Message } from '../models/Message'

export default class ConnectionWs {
  // private clients = new Set<any>()

  constructor(
    private appWsServer: Application,
    private wss: Server,
    private chatsRepository: IChatsRepository,
    private messagesRepository: IMessagesRepository,
  ) { }

  public connection() {
    this.appWsServer.ws('/', async (socket, req) => {
      console.log('подключение установлено со списком чатов')

      const chats = await this.chatsRepository.getChats()
      const chatsRes = new SendMessageWsWithType(chats, 'chats-list')

      socket.send(JSON.stringify(chatsRes))


      socket.on('message', async (msg: string) => {
        const reqParse: GetMessageWsWithType<'connection-in-chat' | 'send-message-in-chat' | 'un-connection-in-chat'> = JSON.parse(msg)

        switch (reqParse.type) {
          case 'connection-in-chat': {
            const connectionInChat = reqParse.data as ConnectionInChatDto
            console.log(`К чату ${connectionInChat.chatId} присоединился юзер ${connectionInChat.userName}`)

            const chatId = connectionInChat.chatId
            socket.chatId = chatId

            const messagesByChatId = await this.messagesRepository.getMessagesByChatId(chatId)
            const messagesByChatIdRes = new SendMessageWsWithType(messagesByChatId, 'messages-in-chat')
            socket.send(JSON.stringify(messagesByChatIdRes))

            const newMessage = new Message(
              Guid.newGuid().toString(),
              Guid.EMPTY,
              chatId.toString(),
              '',
              `Присоединился новый пользователь ${connectionInChat.userName}`,
              new Date())
            await this.messagesRepository.addMessageInChat(newMessage)

            const sendNewMessage = new SendMessageWsWithType(
              newMessage,
              'new-message')
            this.broadcastByChatId(connectionInChat.chatId, JSON.stringify(sendNewMessage))

            break
          }
          case 'send-message-in-chat': {
            const newGetMessage = reqParse.data as GetNewMessageInChatDto

            const newMessage = new Message(
              Guid.newGuid().toString(),
              newGetMessage.userId,
              newGetMessage.chatId,
              newGetMessage.senderName,
              newGetMessage.message,
              new Date())
            await this.messagesRepository.addMessageInChat(newMessage)

            const sendNewMessage = new SendMessageWsWithType(
              newMessage,
              'new-message')
            this.broadcastByChatId(newGetMessage.chatId, JSON.stringify(sendNewMessage))

            break
          }
          case 'un-connection-in-chat': {
            const unConnectionDto = reqParse.data as UnConnectionInChatDto

            const newMessage = new Message(
              Guid.newGuid().toString(),
              Guid.EMPTY,
              unConnectionDto.chatId.toString(),
              '',
              `Пользователь ${unConnectionDto.userName} покинул чат`,
              new Date())
            await this.messagesRepository.addMessageInChat(newMessage)

            const sendNewMessage = new SendMessageWsWithType(
              newMessage,
              'new-message')
            this.broadcastByChatId(unConnectionDto.chatId, JSON.stringify(sendNewMessage))

            break
          }
        }
      })
    })
  }

  private broadcastByChatId(chatId: string, message: string) {
    for (const client of this.wss.clients) {
      if (client.chatId === chatId) {
        client.send(message)
      }
    }
  }
}
