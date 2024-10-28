import { ListGroup, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

type Props = {}

const HomePage = (props: Props) => {
  const chatsStore = useAppSelector(s => s.chatsReducer)
  const navigate = useNavigate()

  return (
    <div className=' p-lg-2'>
      <div className='d-flex justify-content-center gap-4'>
        <Tab.Container id="list-group-tabs-example">
          <ListGroup>
            {chatsStore.chats && chatsStore.chats.length
              ? chatsStore.chats.map(chat =>
                <ListGroup.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/chats/${chat.id}`)}
                  key={chat.id}
                >
                  {chat.id}
                </ListGroup.Item>
              )
              : <h2>Нет чатов</h2>}
          </ListGroup>
        </Tab.Container>
      </div>
    </div>
  )
}

export default HomePage