import { Socket } from 'socket.io';
import { message, room, user } from '../Utilities/socket_listeners'
import { getUserConversationss } from './controller_socket';

export async function onConnection (socket: Socket | any) {
  console.log(`User ${socket.id} connected`)

  getUserConversationss(socket.username)
    .then((results) =>  {
      const conversations = Object.values(results)
      socket.emit(room.join, conversations)
    })

  socket.on(message.send, (data: any) => {
    socket.broadcast.emit(message.receive, () => {

    })
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
}