import { Card, Text, Grid, SimpleGrid, Avatar, Button, Tooltip } from '@mantine/core';
import moment from 'moment';
import { useState, useEffect } from 'react';
import please from '../../requests.js';
import UserAvatar from './UserAvatar.jsx';
import GamePage from '../GamePage/GamePage.js';

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
      <Grid.Col key={event._id} span={3} style={{width: '300px'}}>
        <Card
          shadow='sm'
          p='lg'
          radius='md'>
          <Text sx={{textAlign:'center'}}>
            <h3 onClick={handleCardClick}>{event.eventName}</h3>
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
          <div className='toggle-btn-ctn'>
            <Button
              onClick={() => toggleJoinLeave()}
              variant='light'
              // size='xs'
              sx={{width: '100px'}}
              styles={(theme) => ({
                root: {
                  backgroundColor: `${myGameIds.includes(event._id) ?'hsl(0, 0%, 80%)' : '#0d5f65'}`,
                  color: 'white',
                  margin: 5,
                  "&:hover": {
                    backgroundColor: `${myGameIds.includes(event._id) ?'hsl(0, 0%, 40%)' : "hsl(184,77%,22%)"}`

                  },
                },
              })}
            >
            {myGameIds.includes(event._id) ? 'Going' : 'Let\'s go!'}
            </Button>
          </div>
        </Card>
      </Grid.Col>
    </>
  )
}

export default EventCard;