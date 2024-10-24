import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Guid } from 'js-guid'

interface IInitialState {
  id: Guid | string
  name: string
  isAuth: boolean
}

const initialState: IInitialState = {
  id: Guid.EMPTY,
  name: '',
  isAuth: false
}

const usersSlice = createSlice({
  name: 'modal',
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