import { Socket } from 'socket.io';
import { user, join } from '../Utilities/socket_listeners';

import {
  getConversationIDsFor,
  getConversationsFrom,
  updateConversation,
  createGroupConversation,
  postNewMessage
} from './controller_socket';

import * as ISchema from '../Utilities/Interfaces/Schemas';
import * as ISocket from '../Utilities/Interfaces/Sockets';
import { create } from 'domain';

import io from '../server';
import { Types } from 'mongoose';

export async function onConnection (socket: Socket | any) {
  console.log(`User ${socket.id} connected`)

  socket.join(socket.id);

  socket.on('test', (data: any) => {
    console.log(data);
    // post to data base
    // socket.on('receive_message
      // socket.emit
    // )
    socket.emit('test', 'hi')
    io.sockets.in(socket.id).emit('test1', 'hi1');
  })

  // On connection, retrieves all conversations of user from db and sends to client
  // Joins socket to all conversation rooms
  socket.username ? await getConversationIDsFor(socket.username)
    .then((user) =>  {
      console.log(user)
      user.conversations.forEach((convoID: Types.ObjectId) => socket.join(String(convoID)))
      return getConversationsFrom(user.conversations);
    })
    .then((conversationList) =>
      io.sockets.in(socket.username).emit(user.getConversations, conversationList)
    )
    .catch((err) => console.log(`Error retrieving messages server side: ${err}`))
  : null

  socket.on(user.directMessage, (message: ISchema.Message) => {
    updateConversation(message)
    .then()
    io.sockets.in(String(message.conversationId)).emit(user.directMessage, message)
  })

  socket.on(user.newMessage, (newMessage: ISchema.NewMessage) => {
    postNewMessage(newMessage);
  })

  socket.on(join.room, (joinroom: ISchema.JoinRoom) => {
    socket.join(joinroom.conversationId);
  })

  socket.on(join.group, (joingroup: ISchema.JoinGroup) => {
    createGroupConversation(joingroup)
    .then((conversation) =>
      socket.broadcast.emit(join.group, conversation)
    )
    .catch(err => console.error(err))
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
}