import { useEffect, useState } from 'react'
import { URL_WS } from '../assets/const'


export const useWebSocket = (() => {
  const ws = new WebSocket(`${URL_WS}/chats`)

  const [socket, setSocket] = useState<WebSocket>(ws)

  useEffect(() => {
    setSocket(ws)
  }, [ws])

  return () => {
    return socket
  }
})()