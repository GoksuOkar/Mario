import {Card, Grid, Avatar, Text} from '@mantine/core';

export default function MessageRoom({ setDisplayChat, convo, socket }) {

  return (
    <Card onClick={()=>setDisplayChat(convo)}sx={{border: '1px solid lightgray'}}>
      <Grid>
        <Avatar />
        <Text>{convo.users[1]}</Text>
      </Grid>
    </Card>
  );
}
