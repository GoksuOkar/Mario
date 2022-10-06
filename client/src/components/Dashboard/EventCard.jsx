import { Card, Text, Grid, SimpleGrid, Avatar, Chip } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
import please from '../../requests.js';

const EventCard = ({ event, myGameIds, userId, updateUserInfo }) => {
  // not sure about the best way to keep track of this state, whether the user is already going to the event
  // const [checked, setChecked] = useState(myGameIds.includes(event._id))

  const join = () => {
    console.log('sending request to join game')
    console.log('userid', userId, 'gameid', event._id);
    please.joinGame(userId, event._id)
     .then(() => updateUserInfo())
     .catch(error => console.log(error));
  }

  const leaveGame = (gameId) => {
    console.log('sending request to leave game')
    please.leaveGame(userId, event._id)
      .then(() => updateUserInfo())
      .catch(error => console.log(error))
  }

  const toggleJoinLeave = () => {
    if (myGameIds.includes(event._id)) {
      leaveGame()
    } else {
      join();
    }
  }

  // useEffect(() => {
  //   setChecked(myGameIds.includes(event._id))
  // }, [])
  // make a join/leave function here that updates the checked status
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
            checked={myGameIds.includes(event._id)}
            variant='filled'
            radius='md'
            // change color to #0d5f65'
            color='teal'
            onClick={() => toggleJoinLeave()}>
            {myGameIds.includes(event._id) ? 'Going' : 'Let\'s go!'}
          </Chip>
        </Card>
      </Grid.Col>
    </>
  )
}

export default EventCard;