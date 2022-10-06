import { Card, Text, Grid, SimpleGrid, Avatar, Chip } from '@mantine/core';
import moment from 'moment';
import { useState } from 'react';

// later replace this with a prop
// const sampleEvents = require('./sampleData.js');

const EventCard = ({ event, join, myGameIds }) => {
  const [checked, setChecked] = useState(myGameIds.includes(event._id))

  return (
    <>
      <Grid.Col key={event._id} span={3}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'>
          <Text sx={{textAlign:'center'}}>
            <h3>{event.eventName}</h3>
          </Text>
          <SimpleGrid cols={6} spacing='sm' verticalSpacing='sm'>
              {/* later: click avatar to go to friend's page */}
              {/* later: add default initials if user has no photo */}
              {/* later: use Indicator to point out which are your friends, maybe move them to the top */}
              {event.peopleAttending.map(people => people ? <Avatar key={people._id} src={people.photo} alt='small picture of person attending' radius='xl'></Avatar> : null
              )}
          </SimpleGrid>
          <Text>{event.location}</Text>
          {/* italicise and insert calculated distance */}
          <Text>Miles from you</Text>
          <Text>Date: {moment(event.startTime).format('ll')}</Text>
          <Text>Time: {moment(event.startTime).format('LT')} - {moment(event.endTime).format('LT')}</Text>
          {/* instead of storing state, have this depend on property from the returned data */}
          {/* later: change and flip color of the chip */}
          <Chip
            checked={checked}
            variant='filled'
            radius='md'
            // change color to #0d5f65'
            color='teal'
            onClick={() => join(event._id)}>
            {myGameIds.includes(event._id) ? 'Going' : 'Let\'s go!'}
          </Chip>
        </Card>
      </Grid.Col>
    </>
  )
}

export default EventCard;