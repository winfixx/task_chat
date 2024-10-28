import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  websocket: WebSocket | null
}

const initialState: IInitialState = {
  websocket: null
}

const websocketSlice = createSlice({
  name: 'websocket store',
  initialState,
  reducers: {
    setWebsocket(s, { payload }: PayloadAction<{ websocket: WebSocket }>) {
      s.websocket = payload.websocket
    }
  }
})

export const { actions: websocketAction, reducer: websocketReducer } = websocketSlice