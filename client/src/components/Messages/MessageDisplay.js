import {
  Grid,
  Col,
  SimpleGrid,
  Text,
  Input,
  Button,
  TextInput,
} from '@mantine/core';
import moment from 'moment';
import { useForm } from '@mantine/form';
import { StyledButton } from '../../styledComponents/StyledButtons';
import React, { useState, useEffect } from 'react';
import { user } from '../../Utilities/socket_listeners';
// eslint-disable-next-line
import mCss from './mCss.css';
const sampleMes = ['Hey', "Let's ball!", "I'm down!"];

export function MessageDisplay({ socket, displayChat, userObj }) {
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

  useEffect(() => {
    if (displayChat) {
      setMessages(displayChat.messages);
    }
  }, [displayChat]);

  useEffect(() => {
    scrollToBottom();
  });

  // socket.on('receive')
  socket.on(user.directMessage, (convo) => {
    setMessages(convo.messages);
  });

  // start direct message
  const messageUser = async ({ message }) => {
    socket.emit(user.directMessage, {
      conversationId: displayChat._id,
      username: userObj.username,
      text: message,
      time: new Date(),
    });
  };

  const myMesCon = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const othMesCon = {
    display: 'flex',
    justifyContent: 'flex-start',
  };

  const myMes = {
    border: '1px solid lightblue',
    backgroundColor: '#526bce',
    borderRadius: '25px',
    width: '40%',
    padding: '1rem',
  };

  const othMes = {
    border: '1px solid lightblue',
    backgroundColor: '#542381',
    borderRadius: '25px',
    width: '40%',
    padding: '1rem',
  };

  const sty = {
    border: '1px solid lightgray',
    height: '65vh',
    width: '60vw',
    overflowY: 'auto',
    maxWidth: '80vw',
    padding: '2rem',
    // scrollbarWidth: 'none',
    // '&::WebkitScrollbar': {
    //   display: 'none',
    // },
  };

  return (
    <SimpleGrid m='auto'>
      <div id='id' style={sty}>
        {messages.map((message, i) => (
          <div
            key={i}
            style={
              message.username === userObj.username ? myMesCon : othMesCon
            }>
            <div style={message.username === userObj.username ? myMes : othMes}>
              <Text mr='xl' align='right' color='white' size={10}>
                {message.username}
              </Text>
              <Text m='auto' color='white' size={25}>
                {message.text}
              </Text>
              <Text mr='xl' align='right' color='white' size={10}>
                {moment(message.time).format('LT')}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={form.onSubmit((values) => {
          messageUser(values);
          form.setValues({
            message: '',
          });
        })}>
        <Grid m='auto'>
          <Grid.Col span={11}>
            <TextInput
              placeholder='message'
              {...form.getInputProps('message')}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <StyledButton string={'Send'} type='submit' />
          </Grid.Col>
        </Grid>
      </form>
    </SimpleGrid>
  );
}
