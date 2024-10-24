import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { AppThunkDispatch, RootState } from '../stores/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppThunkDispatch>