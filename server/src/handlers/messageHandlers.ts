// import { Guid } from 'js-guid'
// import { DefaultEventsMap, Server, Socket } from 'socket.io'
// import db from '../db/db.js'

// export default (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
// ) => {
//   const getMessages = () => {
//     const messages = db.data.messages

//     io.in(socket.roomId).emit('messages', messages)
//   }

//   const addMessage = async (message: any) => {
//     await db
//       .update(({ messages }) => messages.push({
//         id: Guid.newGuid(),
//         createdAt: new Date(),
//         ...message
//       }))

//     getMessages()
//   }

//   const removeMessage = async (messageId: any) => {
//     await db
//       .update(({ messages }) =>
//         messages.filter(m => m.id !== messageId))

//     getMessages()
//   }

//   socket.on('message:get', getMessages)
//   socket.on('message:add', addMessage)
//   socket.on('message:remove', removeMessage)
// }