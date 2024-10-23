import express from 'express'
import wsServer from 'express-ws'

const app = express()
const appWsServer = wsServer(app)

const PORT = process.env.PORT || 5000

express.Router().ws('/', (ws, req) => {
  console.log('подключение установлено')
  ws.send('sdsssd')
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
