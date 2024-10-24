import AuthorizePage from '../pages/AuthorizePage'
import HomePage from '../pages/HomePage'

export const authRoutes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/chats/:chatId',
    Component: HomePage
  },
]

export const publicRoutes = [
  {
    path: '/authorize',
    Component: AuthorizePage
  }
]