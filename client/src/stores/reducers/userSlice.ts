import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Guid } from 'js-guid'
import { User } from '../../types/User'

interface IInitialState {
  isAuth: boolean
}

const initialState: User & IInitialState = {
  id: Guid.EMPTY,
  name: '',
  isAuth: false
}

const usersSlice = createSlice({
  name: 'users store',
  initialState,
  reducers: {
    setUser(s, {payload}: PayloadAction<{userName: string}>) {
      s.name = payload.userName
      s.id = Guid.newGuid().toString()
      s.isAuth = true
    }
  }
})

export const { actions: usersAction, reducer: usersReducer } = usersSlice