import { Card, Text, Grid, SimpleGrid, Avatar, Chip } from '@mantine/core';
import moment from 'moment';
import { useState } from 'react';

// later replace this with a prop
const sampleEvents = require('./sampleData.js');

const EventCards = () => {
  // Later: somehow keep state for each chip?
  const [ checked, setChecked ] = useState(false);
  return (
    <>
    <Grid>
      {sampleEvents.map(event =>
        <Grid.Col span={4}>
          <Card shadow='sm' p='lg' radius='md'>
            <Text sx={{textAlign:'center'}}>
              <h3>{event.eventName}</h3>
            </Text>
            <SimpleGrid cols={6} spacing='sm' verticalSpacing='sm'>
                {/* later: click avatar to go to friend's page */}
                {/* later: add default initials if user has no photo */}
                {event.peopleAttending.map(people =>
                  <Avatar src={people.photo} alt='small picture of person attending' radius='xl'></Avatar>
                )}
            </SimpleGrid>
            <Text>{event.location}</Text>
            {/* italicise and insert calculated distance */}
            <Text>Miles from you</Text>
            <Text>Date: {moment(event.startTime).format('ll')}</Text>
            <Text>Time: {moment(event.startTime).format('LT')} - {moment(event.endTime).format('LT')}</Text>
            {/* instead of storing state, have this depend on property from the returned data */}
            <Chip
              checked={checked}
              onChange={() => setChecked((v) => !v)}
              variant='filled'
              sx={{color:'#0d5f65'}}
              style={{color:'#0d5f65'}}
              color='teal'>
              {checked ? 'Going' : 'Let\'s go!'}
            </Chip>
          </Card>
        </Grid.Col>
      )}
    </Grid>
    </>
  )
}

export default EventCards;