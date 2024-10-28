import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { URL_WS } from './assets/const'
import { GetMessageWsWithType } from './dto/GetMessageWsWithType'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import AppRouter from './router/AppRouter'
import { chatsAction } from './stores/reducers/chatsSlice'
import { messagesAction } from './stores/reducers/messagesSlice'
import { websocketAction } from './stores/reducers/websocketSlice'
import { Chat } from './types/Chat'
import { Message } from './types/Message'

function App() {
  const userStore = useAppSelector(s => s.usersReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userStore.isAuth) {
      const ws = new WebSocket(URL_WS)

      ws.onopen = e => {
        dispatch(websocketAction.setWebsocket({ websocket: ws }))
      }

      ws.onmessage = e => {
        const data = e.data

        if (data) {
          const resParse: GetMessageWsWithType<'chats-list' | 'messages-in-chat' | 'new-message'> = JSON.parse(data)

          switch (resParse.type) {
            case 'chats-list':
              dispatch(chatsAction.setChats({ chats: resParse.data as Chat[] }))
              break
            case 'messages-in-chat':
              dispatch(messagesAction.setMessages({ messages: resParse.data as Message[] }))
              break
            case 'new-message':
              const newUserMess = resParse.data as Message
              dispatch(messagesAction.addMessage({ message: newUserMess }))
              break
            default: break
          }
        }
      }
    }
  }, [userStore.isAuth])

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
