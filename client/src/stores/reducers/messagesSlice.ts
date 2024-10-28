import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../../types/Message'

interface IInitialState {
  messages: Message[]
}

const initialState: IInitialState = {
  messages: []
}

const messagesSlice = createSlice({
  name: 'messages store',
  initialState,
  reducers: {
    setMessages(s, { payload }: PayloadAction<{ messages: Message[] }>) {
      s.messages = payload.messages
    },
    addMessage(s, { payload }: PayloadAction<{ message: Message }>) {
      s.messages.push(payload.message)
    }
  }
})

export const { actions: messagesAction, reducer: messagesReducer } = messagesSlice