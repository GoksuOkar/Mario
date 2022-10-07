import { Avatar, SimpleGrid, Grid, Text, Card, Divider } from '@mantine/core';
import { BigStyledButton } from '../../styledComponents/StyledButtons.js';
import { socket } from './../../App';
import { user, join } from '../../Utilities/socket_listeners';

// later: replace this with prop

export default function YourGroup({group}) {
  const joinRoom = () => {
    // all the users array will be Object.keys(group);
    socket.emit(join.group, {
      conversationName: null,
      users: Object.keys(group),
    })
  };
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
          <BigStyledButton string={'Message Group'} onClick={joinRoom}/>
        </SimpleGrid>
      </Card>
    </>
  );
}
