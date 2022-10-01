import React from 'react';
// import WebSocket from 'ws';

// define connection
const connect = new WebSocket('ws://localhost:8082');

export default function Dropdown() {
  connect.addEventListener('message', (e) => {
    console.log(e);
  });
  const open = (e) => {
    e.preventDefault();
    connect.send('SOOOKIT');
  };

  return <button onClick={open}>Messages</button>;
}
