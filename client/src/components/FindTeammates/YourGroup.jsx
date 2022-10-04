import { Button, Avatar, Grid, Text, Card, Divider } from '@mantine/core';

// later: replace this with prop
const sampleTeammates = require('./sampleTeammates.js');

export default function YourGroup() {
  const joinRoom = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Card shadow='sm' p='lg' radius='md'>
        <Text>Your Group</Text>
        <Divider my='sm' />
        <Text>Teammates</Text>
        {sampleTeammates.map((teammate) => (
          <div key={teammate._id}>
            <Grid>
              <Avatar
                src={teammate.photo}
                alt='profile picture of teammates'
                radius='xl'></Avatar>
              <Text>{teammate.name}</Text>
            </Grid>
          </div>
        ))}
        <Button onClick={joinRoom} radius='xl' size='xs'>
          Message Group
        </Button>
      </Card>
    </>
  );
}
