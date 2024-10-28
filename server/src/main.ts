import cors from 'cors'
import express from 'express'
import wsServer from 'express-ws'
import db from './dataAccess/lowdb/db/db'
import { ChatsRepository } from './dataAccess/lowdb/repository/ChatsRepository'
import { MessagesRepository } from './dataAccess/lowdb/repository/MessagesRepository'
import ConnectionWs from './routerWs/routerWs'

const app = express()
const appWsServer = wsServer(app)

const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:3000/'
}))

const conWs = new ConnectionWs(
  appWsServer.app,
  appWsServer.getWss(),
  new ChatsRepository(db),
  new MessagesRepository(db))

conWs.connection()

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
