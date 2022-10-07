import { Avatar, SimpleGrid, Grid, Text, Card, Divider } from '@mantine/core';
import { BigStyledButton } from '../../styledComponents/StyledButtons.js';
import { socket } from './../../App';
import { join } from '../../Utilities/socket_listeners';
import { useState } from 'react';

// later: replace this with prop

export default function YourGroup({ group, user, setPage }) {
  const [makeGroup, setMakeGroup] = useState(false);

  const joinRoom = () => {
    // all the users array will be Object.keys(group);
    socket.emit(join.group, {
      conversationName: null,
      users: Object.keys(group),
    });
    setMakeGroup(true);
  };

  socket.on(join.room, (convo) => {
    // if convo users includes my username, then add that convo to convo list
    if (convo.users.includes(user.username)) {
      socket.emit(join.room, { conversationId: convo._id.toString() });
      if (makeGroup) {
        setMakeGroup(false);
        setPage('messages');
      }
    }
  });

  return (
    <>
      <Card shadow='sm' p='lg' radius='md'>
        <Text>Your Group</Text>
        <Divider my='sm' />
        <SimpleGrid>
          <Text>Teammates</Text>
          {Object.values(group).map((teammate) => (
            <div key={teammate._id}>
              <Grid>
                <Avatar
                  src={teammate.photo}
                  alt='profile picture of teammates'
                  radius='xl'></Avatar>
                <Text>{teammate.username}</Text>
              </Grid>
            </div>
          ))}
          <BigStyledButton string={'Message Group'} onClick={joinRoom} />
        </SimpleGrid>
      </Card>
    </>
  );
}
