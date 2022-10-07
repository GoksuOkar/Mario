import {Grid,SimpleGrid,Text, Input, Button, TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import { StyledButton } from '../../styledComponents/StyledButtons';
import React, {useState, useEffect, useRef} from 'react';
import { user, join } from '../../Utilities/socket_listeners';
const sampleMes = ['Hey', 'Let\'s ball!', 'I\'m down!'];

export function MessageDisplay ({socket, displayChat, userObj}) {
  const [messages, setMessages] = useState(sampleMes);

  const form = useForm({
    initialValues: {
      message: '',
    },
  });

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
  const messageUser = async ({message}) => {
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
      <form onSubmit={form.onSubmit((values) => {
        messageUser(values);
        form.setValues({
          message: ''
        })
      })}>
        <Grid m='auto'>
          <TextInput
            placeholder='message'
            styles={(theme) => ({
              root: {
                width: '70%',
                marginLeft: '1%'
              }
            })}
            {...form.getInputProps('message')}
          />
        <StyledButton string={'Send'} type='submit'/>
        </Grid>
      </form>
      </SimpleGrid>
  )
}