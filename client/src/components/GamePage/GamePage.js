import { useState, useEffect } from 'react';
import request from '../../requests.js';
// import GMap from './GMap.js';
import Info from './Info';
import Comments from './Comments.js';
import EventMap from './Map.js';
import {Grid, Avatar, Button, Divider, Card} from '@mantine/core';

//<GamePage gameid={id} userName={userObj.username} set={setPage} />


const GamePage = ({ gameid, userName, set }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    request.getOneGame(gameid).then((data) => {
      setGame(data.data);
    }).catch((err) => {
      console.log('this is a getOneGame error!', err);
    });

  }, [])

  return(
    // default is 12 columns, but you can set your own
    <div style={{margin: '20px'}}>
      <Grid justify='center'>
        <Grid.Col xs={6} sm={6} md={6} lg={6}>
          <Card
            shadow='sm'
            p='lg'
            radius='md'>
            <Info
              name={game.eventName}
              createdBy={game.creator}
              attending={game.peopleAttending}
              location={game.location}
              start={game.startTime}
              end={game.endTime}
              description={game.eventDescription}
              />
            <Comments
              name={userName}
              eventID={gameid}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span='content'>
          <Card>
            <EventMap address={game.location} />
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default GamePage;

