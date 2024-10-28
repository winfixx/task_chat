import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ConnectionInChatDto } from '../dto/ConnectionInChatDto'
import { SendMessageWsWithType } from '../dto/SendMessageWsWithType'
import { UnConnectionInChatDto } from '../dto/UnConnectionInChatDto'
import { useAppSelector } from '../hooks/redux'
import { GetNewMessageInChatDto } from '../dto/GetNewMessageInChatDto'

type Props = {}

const ChatPage = (props: Props) => {
  const { chatId } = useParams()

  const [newMessage, setNewMessage] = useState('')

  const chatsRef = useRef<HTMLDivElement>(null)

  const userStore = useAppSelector(s => s.usersReducer)
  const messageStore = useAppSelector(s => s.messagesReducer)
  const wsStore = useAppSelector(s => s.websocketReducer)

  const scrollToEnd = useCallback(() => {
    if (chatsRef && chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight
    }
  }, [chatsRef.current?.scrollHeight])

  useEffect(() => {
    scrollToEnd()
  }, [chatsRef.current?.scrollHeight, messageStore.messages])

  useEffect(() => {
    const userConnectionDto =
      new ConnectionInChatDto(userStore.id, chatId!, userStore.name)

    const sendUserConnectionDto = new SendMessageWsWithType(userConnectionDto, 'connection-in-chat')
    wsStore.websocket!.send(JSON.stringify(sendUserConnectionDto))
  }, [chatId, userStore, wsStore])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newMessage) return

    const newMessageDto =
      new GetNewMessageInChatDto(userStore.id, chatId!, userStore.name, newMessage)

    const sendNewMessageDto = new SendMessageWsWithType(newMessageDto, 'send-message-in-chat')
    wsStore.websocket!.send(JSON.stringify(sendNewMessageDto))

    setNewMessage('')
  }, [chatId, newMessage, userStore, wsStore])

  useEffect(() => {
    return () => {
      const userUnConnectDto =
        new UnConnectionInChatDto(userStore.id, chatId!, userStore.name)

      const sendUserUnConnectDto = new SendMessageWsWithType(userUnConnectDto, 'un-connection-in-chat')
      wsStore.websocket!.send(JSON.stringify(sendUserUnConnectDto))
    }
  }, [])

  return (
    <>
      {chatId
        ? <div ref={chatsRef} className='position-relative p-1 overflow-y-scroll' style={{ height: '100vh' }}>
          <div className='d-flex flex-column '>
            {messageStore.messages.map(m =>
              <Alert
                variant={userStore.id === m.userId ? 'dark' : 'light'}
                className={`${userStore.id === m.userId ? 'align-items-end' : 'align-items-start'} d-flex flex-column`}
                key={m.id}
              >
                {m.senderName && <><h3>{m.senderName}</h3> </>}

                {m.messageText}
              </Alert>
            )}
          </div>

          <div className='position-sticky bottom-0 bg-white w-100'>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Написать сообщение..."
                />
                <Button variant="outline-success" type='submit'>
                  Отправить
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
        : <div>
          <h2>Такого чата не существует</h2>
        </div>}
    </>
  )
}

export default ChatPage