import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid, SimpleGrid } from '@mantine/core';
import EventCard from './EventCard.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';
import please from '../../requests.js';


const Dashboard = ({ userId }) => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  const [games, setGames] = useState([])
  const [myGames, setMyGames] = useState([]);
  const [myGameIds, setMyGameIds] = useState([]);

  const join = (gameId) => {
    console.log('sending request to join game')
    please.joinGame(userId, gameId)
     .then(() => please.getAllGames())
     .then(data => setGames(data.data))
     .catch(error => console.log(error));
  }

  const leaveGame = (gameId) => {
    console.log('sending request to leave game')
  }

  useEffect(() => {
    please.getAllGames()
      .then(data => setGames(data.data))
  }, [])

  // I shouldn't have to make a request for user info, that request should be made earlier and passed down as a prop
  useEffect(() => {
    please.getUserInfo(userId)
     .then(data => {
      let events = data.data.events
      let eventIds = events.map(event => event._id)
      setMyGames(events);
      setMyGameIds(eventIds);
    })
     .catch(error => console.log(error));
  }, [])

  return (
    <div style={{margin: '40px'}}>
      <Grid grow>
        <Grid.Col span={1}>
          <UpcomingGames myGames={myGames}/>
          {/* later: turn this into a basketball */}
          {/* link this to open up modal form */}
          <Button
            radius='xl'
            size='xl'
            onClick={()=>setFormOpen(true)}>
            Make Game
          </Button>
          {formOpen && <MakeGame setFormOpen={setFormOpen} userId={userId}/>}
        </Grid.Col>
        <Grid.Col span={9}>
          <SimpleGrid>
            <SegmentedControl
              data={[
                {label: 'upcoming', value: 'upcoming'},
                {label: 'nearest to me', value: 'distance'},
                {label: 'with friends attending', value: 'friends'}
              ]}
              value={sortBy}
              onChange={setSortBy}
              />
          </SimpleGrid>
          {/* {games && <EventCard
            games={games}
            join={join}
            myGames={myGames}/>} */}
          {
            games
            ?
            <Grid>
              {games.map(event => <EventCard event={event} join={join} myGameIds={myGameIds}/>)}
            </Grid>
            :
            null
          }
        </Grid.Col>
      </Grid>
    </div>
  )

}

export default Dashboard;