import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chat } from '../../types/Chat'

interface IInitialState {
  chats: Chat[]
}

const initialState: IInitialState = {
  chats: []
}

const chatsSlice = createSlice({
  name: 'chats store',
  initialState,
  reducers: {
    setChats(s, { payload }: PayloadAction<{ chats: Chat[] }>) {
      s.chats = payload.chats
    }
  }
})

export const { actions: chatsAction, reducer: chatsReducer } = chatsSlice