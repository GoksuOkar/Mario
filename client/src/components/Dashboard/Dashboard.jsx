import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid, SimpleGrid } from '@mantine/core';
import EventCards from './EventCards.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';
import please from '../../requests.js';


const Dashboard = ({ userId }) => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  const [games, setGames] = useState([])
  const [myGames, setMyGames] = useState([]);

  const join = (gameId) => {
    console.log('sending request to join game')
    please.joinGame(userId, gameId)
     .then(() => please.getAllGames())
     .then(data => setGames(data.data))
  }

  useEffect(() => {
    please.getAllGames()
      .then(data => setGames(data.data))
  }, [])

  // I shouldn't have to make a request for user info, that request should be made earlier and passed down as a prop
  useEffect(() => {
    please.getUserInfo(userId)
     .then(data => setMyGames(data.data.events))
    //  map events into an array of event ids
    // get events based on that array of ids
     .catch(error => console.log(error));
  }, [])

  return (
    <>
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
          {games && <EventCards sortBy={sortBy} setSortBy={setSortBy} games={games} join={join}/>}
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Dashboard;