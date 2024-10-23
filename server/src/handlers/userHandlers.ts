// import { DefaultEventsMap, Server, Socket } from 'socket.io'

// const users: any = {
//   1: { username: 'Alice', online: false },
//   2: { username: 'Bob', online: false }
// }

// export default (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
// ) => {
//   const getUsers = () => {
//     io.in(socket.roomId).emit('users', users)
//   }

//   const addUser = ({ username, userId }: any) => {
//     if (!users[userId])
//       users[userId] = { username, online: true }
//     else
//       users[userId].online = true

//     getUsers()
//   }

//   const removeUser = (userId: any) => {
//     users[userId].online = false

//     getUsers()
//   }

//   socket.on('user:get', getUsers)
//   socket.on('user:add', addUser)
//   socket.on('user:leave', removeUser)
// }