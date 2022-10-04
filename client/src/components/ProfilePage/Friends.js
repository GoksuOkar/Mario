import { Grid, Avatar, Card, Text, SimpleGrid } from '@mantine/core';
import players from '../FindTeammates/sampleTeammates.js';

export default function Friends({ friends }) {
  return (
    <SimpleGrid m='auto'>
      <Text size={20} m='auto' weight='bolder'>
        FRIENDS
      </Text>
      <Grid m='auto'>
        {players.map((player) => (
          <Card m='auto' key={player._id}>
            <Avatar m='auto' src={player.photo} />
            <Text>{player.name}</Text>
          </Card>
        ))}
      </Grid>
    </SimpleGrid>
  );
}
