import {Grid,SimpleGrid,Text, Input, Button} from '@mantine/core';
import React, {useState, useEffect, useRef} from 'react';
import { user, join } from '../../Utilities/socket_listeners';
const sampleMes = ['Hey', 'Let\'s ball!', 'I\'m down!'];

export function MessageDisplay ({socket, displayChat, userObj}) {
  const [messages, setMessages] = useState(sampleMes);

  function scrollToBottom() {
    const bottom = document.querySelector('#id').scrollHeight;
    document.querySelector('#id').scrollTo(0, bottom);
  }

  useEffect(()=>{
    if (displayChat) {
      setMessages(displayChat.messages)
    }
  },[displayChat])

  useEffect(() => {
    scrollToBottom();
  })

  // socket.on('receive')
  socket.on(user.directMessage, (convo)=>{
    setMessages(convo.messages);
  });

  // start direct message
  const messageUser = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit(user.directMessage, {
      conversationId: displayChat._id,
      username: userObj.username,
      text: message,
      time: new Date()
    });
  };

  const sty = {
    border: '1px solid lightgray',
    height: '75vh',
    overflow: 'auto',
    maxWidth: '80vw'
  }

  return (
      <SimpleGrid m='auto'>
        <div id='id' style={sty}>
        {messages.map((message, i)=>
          <div key={i} style={{border: '1px solid lightgray'}}>
              <Text size={25}>{message.username}</Text>
              <Text size={100}>{message.text}</Text>
              <Text size={25}>{message.time}</Text>
            </div>
        )
      }
        </div>
      <form onSubmit={messageUser}>
        <Grid m='auto'>
        <input style={{width: '70%', marginLeft: '1%'}} name='message' placeholder='message' />
        <Button>Send</Button>
        </Grid>
      </form>
      </SimpleGrid>
  )
}