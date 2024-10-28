import { redirect, Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { authRoutes, publicRoutes } from './routes'
import { useEffect } from 'react'
import HomePage from '../pages/HomePage'

type Props = {}

const AppRouter = (props: Props) => {
  const userStore = useAppSelector(s => s.usersReducer)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userStore.isAuth) {
      navigate('/authorize')
    }
  }, [userStore.isAuth])

  return (
    <Routes>
      {userStore.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route key={'*'} element={<HomePage />}/>
    </Routes>
  )
}

export default AppRouter