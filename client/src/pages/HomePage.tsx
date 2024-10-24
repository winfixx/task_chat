import { useEffect, useState } from 'react'
import { ListGroup, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { URL_WS } from '../assets/const'
import { useAppSelector } from '../hooks/redux'
import { Chat } from '../types/Chat'
import ChatPage from './ChatPage'

type Props = {}

const HomePage = (props: Props) => {
  const userStore = useAppSelector(s => s.usersReducer)

  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    let ws: WebSocket
    if (userStore.isAuth) {
      ws = new WebSocket(`${URL_WS}/chats`)

      ws.onmessage = e => {
        console.log(e.data);
        if (e.data) setChats(JSON.parse(e.data))
      }
    }
  }, [userStore.isAuth])

  return (
    <div className=' p-lg-2'>
      <div className='d-flex justify-content-center gap-4'>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <ListGroup>
            {chats?.map(chat =>
              <ListGroup.Item className='p-0' key={chat.id}>
                <Link className='w-100 h-100 p-lg-3' to={`/chats/${chat.id}`}>
                  {chat.id}
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Tab.Container>

        <ChatPage />
      </div>
    </div>
  )
}

export default HomePage