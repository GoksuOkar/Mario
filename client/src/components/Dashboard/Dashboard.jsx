import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid } from '@mantine/core';
import EventCards from './EventCards.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';
import please from '../../requests.js';


const Dashboard = ({ userId }) => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  const [games, setGames] = useState([])

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
     .then(data => please.getGamesByIds(data.data.events))
     .then(data => setGames(data.data))
     .catch(error => console.log(error));
  }, [])

  return (
    <>
      <Grid>
        <Grid.Col span={2}>
          <UpcomingGames />
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
        <Grid.Col span={8}>
          <p>Sort by:</p>
          <SegmentedControl
            data={[
              {label: 'upcoming', value: 'upcoming'},
              {label: 'distance', value: 'distance'},
              {label: 'friends', value: 'friends'}
            ]}
            value={sortBy}
            onChange={setSortBy}
            />
          <EventCards sortBy={sortBy} setSortBy={setSortBy} games={games} join={join}/>
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Dashboard;