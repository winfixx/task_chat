import { AnyAction, Store, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './reducers/userSlice'
import { messagesReducer } from './reducers/messagesSlice'
import { chatsReducer } from './reducers/chatsSlice'
import { websocketReducer } from './reducers/websocketSlice'

const rootReducer = combineReducers({
  usersReducer,
  messagesReducer,
  chatsReducer,
  websocketReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, any>
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch
}

const setupStore: AppStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['websocket store/setWebsocket'],
        ignoredPaths: ['websocketReducer.websocket']
      }
    })
})

export default setupStore