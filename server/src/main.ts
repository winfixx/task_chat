import cors from 'cors'
import express from 'express'
import wsServer from 'express-ws'
import { Guid } from 'js-guid'
import db from './db/db'

const app = express()
const appWsServer = wsServer(app)
const appWss = appWsServer.getWss()

const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:3000/'
}))

class User {
  constructor(
    public id: Guid,
    public name: string
  ) { }
}

class UserConnectionInChatDto {
  constructor(
    public userId: Guid,
    public chatId: Guid,
    public userName: string,
    public method: string
  ) { }
}

// appWsServer.app.ws('/', (ws, req) => {
//   console.log('подключение установлено')

//   ws.on('message', (msg: string) => {
//     const msgParse: UserConnectionInChatDto = JSON.parse(msg)
//     switch (msgParse.method) {
//       case 'connection':
//         connectionHandler(ws, msgParse)
//         break
//       default:
//         break
//     }
//   })
// })

appWsServer.app.ws('/chats', (ws, req) => {
  console.log('подключение установлено со списком чатов')

  ws.send(JSON.stringify(db.data.chats))
})

appWsServer.app.ws('/chats/:chatId', (ws, req) => {
  console.log('подключение установлено с чатом')

  ws.send(JSON.stringify(db.data.chats))

  ws.on('message', (msg: string) => {
    const user: User = JSON.parse(msg)

    console.log(`К чату присоединился ${user.name}`)

    // appWss.clients.forEach(client => {
    // })

    // ws.send(msg)
  })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

// const connectionHandler = (ws: any, msg: UserConnectionInChatDto) => {
//   ws.chatId = msg.chatId

//   broadcastConnection(ws, msg)
// }

// const broadcastConnection = (ws: any, msg: UserConnectionInChatDto) => {
//   appWss.clients.forEach((client) => {

//     client.send(`Пользователь ${msg.userName} подключился`)
//   })
// }