import { Avatar, Grid, SimpleGrid, Text, Card } from '@mantine/core';
import sampleTeammates from '../FindTeammates/sampleTeammates.js';

export default function Game({ event }) {
  return (
    <Card>
      <Grid sx={{ border: '1px solid lightgray' }}>
        <Grid m='xs'>
          {sampleTeammates.map((player) => (
            <Avatar key={player._id} src={player.photo} radius={100} m='auto' />
          ))}
        </Grid>
        <SimpleGrid m='xs'>
          <Text weight='bolder'>{event.eventName}</Text>
          <Text>{event.location}</Text>
          <Text>{event.startTime}</Text>
        </SimpleGrid>
      </Grid>
    </Card>
  );
}
