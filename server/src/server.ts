import express, { Express } from 'express';

import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import { router } from './routes';
import { Server } from 'socket.io';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const port = 3001;

const socket = http.createServer(app);

const io = new Server(socket, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["Get", "POST"],
  },
})

io.on('connection', (socket) => {

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', () => {

    })
  })
})

app.use('/', router);

app.set('port',port);
app.listen(port, () => console.log(`listening on port ${port}`));