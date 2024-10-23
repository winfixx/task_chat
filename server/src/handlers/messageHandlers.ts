// import { DefaultEventsMap, Server, Socket } from 'socket.io'
// import db from '../db/db.js'
// import { Guid } from 'js-guid'

// export default (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
// ) => {
//   const getMessages = () => {
//     const messages = db. get('messages').value()

//     io.in(socket.roomId).emit('messages', messages)
//   }

//   // обрабатываем добавление сообщения
//   // функция принимает объект сообщения
//   const addMessage = (message: any) => {
//     db.get('messages')
//       .push({
//         messageId: Guid.newGuid(),
//         createdAt: new Date(),
//         ...message
//       })
//       .write()

//     // выполняем запрос на получение сообщений
//     getMessages()
//   }

//   // обрабатываем удаление сообщение
//   // функция принимает id сообщения
//   const removeMessage = (messageId: any) => {
//     db.get('messages').remove({ messageId }).write()

//     getMessages()
//   }

//   // регистрируем обработчики
//   socket.on('message:get', getMessages)
//   socket.on('message:add', addMessage)
//   socket.on('message:remove', removeMessage)
// }