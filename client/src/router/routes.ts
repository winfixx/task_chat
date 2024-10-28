import AuthorizePage from '../pages/AuthorizePage'
import ChatPage from '../pages/ChatPage'
import HomePage from '../pages/HomePage'

export const authRoutes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/chats/:chatId',
    Component: ChatPage
  },
]

export const publicRoutes = [
  {
    path: '/authorize',
    Component: AuthorizePage
  }
]