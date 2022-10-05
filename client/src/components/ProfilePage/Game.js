import { Avatar, Grid, SimpleGrid, Text, Card } from '@mantine/core';

export default function Game({ event }) {
  return (
    <Card>
      <Grid sx={{ border: '1px solid lightgray' }}>
        <SimpleGrid>
          <Grid m='xs'>
            {event.peopleAttending.map((player, i) =>
              player && i % 2 === 0 ? (
                <Avatar
                  key={player._id}
                  src={player.photo}
                  radius={100}
                  m='auto'
                />
              ) : null
            )}
          </Grid>
          <Grid m='xs'>
            {event.peopleAttending.map((player, i) =>
              player && i % 2 === 1 ? (
                <Avatar
                  key={player._id}
                  src={player.photo}
                  radius={100}
                  m='auto'
                />
              ) : null
            )}
          </Grid>
        </SimpleGrid>
        <SimpleGrid m='xs'>
          <Text weight='bolder'>{event.eventName}</Text>
          <Text>{event.location}</Text>
          <Text>{event.startTime}</Text>
        </SimpleGrid>
      </Grid>
    </Card>
  );
}
