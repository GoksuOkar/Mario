import { Grid, Avatar, Card, Text } from '@mantine/core';
import players from '../FindTeammates/sampleTeammates.js';

export default function Friends() {
  return (
    <>
      <Text>FRIENDS</Text>
      <Grid m='auto'>
        {players.map((player) => (
          <Card key={player._id}>
            <Avatar src={player.photo} />
            <Text>{player.name}</Text>
          </Card>
        ))}
      </Grid>
    </>
  );
}
