import express, { Express } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    isAuth: boolean;
    user: string;
  }
}

import mongoDBSession from 'connect-mongodb-session';

import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import { router } from './routes';

import { Server, Socket } from 'socket.io';
import { onConnection } from './Sockets/route_socket'

import { mongo, ObjectId } from 'mongoose';
import { Session } from 'inspector';


const app: Express = express();
const port = 3001;
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const socketServer = http.createServer(app);

// creates a session DB to store "sessions when instructed to"
const store = mongoDBSession(session)
const Store = new store({
  uri:`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@18.144.12.217/${process.env.DBNAME}`,
  collection: 'mySessions'
})

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// session middleware for obtaining cookies
app.use(session({
  secret: 'key that will sign the cookie',  //change at later point
  resave: false,
  saveUninitialized: false,
  store: Store,
}))

app.use('/', router);

const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}).listen(server);

io.use((socket: Socket, next):void => {
  // authorization
  // const username = socket.handshake.auth.username;
  // if (!username) {
  //   return next(new Error('invalid username'))
  // }
  // socket.username = username;
  next();
})

io.on('connection', onConnection)

export default io;