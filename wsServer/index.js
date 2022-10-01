const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', (ws) => {
  console.log('connected');

  // ws.onmessage;

  ws.on('message', (data) => {
    console.log('halp');

    ws.send(data);
  });

  ws.on('close', () => 'bye');
});
