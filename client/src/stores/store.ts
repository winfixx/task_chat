import { AnyAction, Store, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './reducers/userSlice'

const rootReducer = combineReducers({
  usersReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, any>
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch
}

const setupStore: AppStore = configureStore({
  reducer: rootReducer,
})

export default setupStore