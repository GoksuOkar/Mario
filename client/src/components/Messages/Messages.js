import React, { useEffect } from 'react';
// import WebSocket from 'ws';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function Dropdown() {

  const sendMessage = () => {
    socket.emit('send_message', {
      message: 'hello',
    })
  }

  useEffect(() => {

  })


  return (
    <div>
      <input placeholder='Type here'/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
