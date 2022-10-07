import { Card, Text, Grid, SimpleGrid, Avatar, Chip, Tooltip } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
import please from '../../requests.js';
import UserAvatar from './UserAvatar.jsx';

const EventCard = ({ event, myGameIds, userId, updateUserInfo, setDispId, setPage, setGameState }) => {
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

  const handleCardClick = () => {
    setGameState(event._id);
    setPage('gp');
  }

  return (
    <>
      <Grid.Col key={event._id} span={3}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'>
          <Text sx={{textAlign:'center'}}>
            <h3 onClick={handleCardClick}>{event.eventName}</h3>
          </Text>
          <SimpleGrid cols={6} spacing='sm' verticalSpacing='sm'>
              {event.peopleAttending.map(playerId => playerId
              ?
              <UserAvatar
              key={playerId}
              playerId={playerId}
              setDispId={setDispId}
              setPage={setPage}/>
              :
              null
              )}
          </SimpleGrid>
          <Text>{event.location}</Text>
          {/* italicise and insert calculated distance */}
          <Text>Miles from you</Text>
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