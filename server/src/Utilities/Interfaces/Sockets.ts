//example interfaces for sockets from documentation
import { Socket } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    username?: String;
  }
}