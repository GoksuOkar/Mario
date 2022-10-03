import { Socket } from 'socket.io';
import { message, room, user } from '../Utilities/socket_listeners'
import { getConversationIDsFor, getConversationsFrom, updateConversation } from './controller_socket';
import { io } from '../server';
import * as I from '../Utilities/Interfaces/Schemas'

export async function onConnection (socket: Socket | any) {
  console.log(`User ${socket.id} connected`)

  socket.join(socket.username);

  // On connection, retrieves all conversations of user from db and sends to client
  // Joins socket to all conversation rooms
  await getConversationIDsFor(socket.username)
    .then((convoIDs) =>  {
      convoIDs.forEach((convoID: String) => socket.join(convoID))
      return getConversationsFrom(convoIDs);
    })
    .then((conversationList) => socket.to(socket.username).emit(user.getConversations, conversationList))
    .catch((err) => console.log(`Error retrieving messages server side: ${err}`));

  socket.on(user.directMessage, (message: I.Message) => {
    updateConversation(message);
    socket.to(message.conversationId).emit(user.directMessage, message)
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
}