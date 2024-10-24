import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { URL_WS } from '../assets/const'
import { useAppSelector } from '../hooks/redux'

type Props = {}

const ChatPage = (props: Props) => {
  const { chatId } = useParams()

  const userStore = useAppSelector(s => s.usersReducer)

  useEffect(() => {
    if (chatId) {
      const ws = new WebSocket(`${URL_WS}/chats/${chatId}`)

      ws.onopen = e => {
        ws.send(JSON.stringify(userStore))
      }

      ws.onmessage = e => {
        // console.log(`К чату присоединился ${JSON.parse(e.data).name}`)
      }
    }
  }, [chatId])

  return (
    <>
      {chatId
        && <div>Chat</div>
      }
    </>
  )
}

export default ChatPage