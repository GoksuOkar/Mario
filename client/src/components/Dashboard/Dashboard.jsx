import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid } from '@mantine/core';
import EventCards from './EventCards.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';
import please from '../../requests.js';


const Dashboard = () => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  const [games, setGames] = useState([])

  useEffect(() => {
    please.getAllGames()
      .then(data => setGames(data.data))
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
          {formOpen && <MakeGame setFormOpen={setFormOpen}/>}
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
          <EventCards sortBy={sortBy} setSortBy={setSortBy} games={games}/>
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Dashboard;