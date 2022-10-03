import { Socket } from 'socket.io';
import { message, room, user } from '../Utilities/socket_listeners'
import { getConversationsFor, updateConversation } from './controller_socket';
import { io } from '../server';
import * as I from '../Utilities/Interfaces/Schemas'

export async function onConnection (socket: Socket | any) {
  console.log(`User ${socket.id} connected`)

  socket.join(socket.username);

  // On connection, retrieves all conversations of user from db and sends to client
  // Joins socket to all conversation rooms
  await getConversationsFor(socket.username)
    .then((results) =>  {
      const conversations = Object.values(results.conversations)
      conversations.forEach((convo:any) => socket.join(convo.id))
      io.to(socket.username).emit(user.getConversations, results.conversations)
    })

  socket.on(user.directMessage, (message: I.Message) => {
    updateConversation(message);
    // find conversation from ID, update message array, save to db and emit to room
    socket.to(message.conversationId).emit(user.directMessage, () => {
      // show on client side
    })
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
}