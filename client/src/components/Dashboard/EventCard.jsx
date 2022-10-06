import { Card, Text, Grid, SimpleGrid, Avatar, Chip, Tooltip } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
import please from '../../requests.js';
import UserAvatar from './UserAvatar.jsx';

const EventCard = ({ event, myGameIds, userId, updateUserInfo, setDispId, setPage }) => {
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
  let attendees = event.peopleAttending;
  let fakeKey = 0;
  while (attendees.length < 12) {
    attendees.push(fakeKey)
    fakeKey++;
  }

  return (
    <>
      <Grid.Col key={event._id} span={3}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'
          style={{width: '300px'}}>
          <Text sx={{textAlign:'center'}}>
            <h3>{event.eventName}</h3>
          </Text>
          <SimpleGrid cols={6} spacing='sm' verticalSpacing='sm'>
          {attendees.map(playerId =>
          typeof playerId === 'string'
          ?
          <UserAvatar
          key={playerId}
          playerId={playerId}
          setDispId={setDispId}
          setPage={setPage}/>
          :
          <Avatar
          key={playerId}
          src={null}
          alt='small picture of person attending'
          radius='xl'>
          </Avatar>
          )}
          </SimpleGrid>
          {event.location.length < 30
          ?
          <Text>{event.location}</Text>
          :
          <Tooltip label={event.location}>
            <Text>{event.location.slice(0, 30)}...</Text>
          </Tooltip>
          }
          {/* italicise and insert calculated distance */}
          {/* <Text>Miles from you</Text> */}
          <Text>Date: {moment(event.startTime).format('ll')}</Text>
          <Text>Time: {moment(event.startTime).format('LT')} - {moment(event.endTime).format('LT')}</Text>
          <Chip
            checked={myGameIds.includes(event._id)}
            variant='filled'
            radius='md'
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