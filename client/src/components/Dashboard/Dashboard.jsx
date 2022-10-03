import React, { useState } from 'react';
import { SegmentedControl, Button, Grid } from '@mantine/core';
import EventCards from './EventCards.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';


const Dashboard = () => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <div>
        Dashboard
      </div>
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
          <EventCards sortBy={sortBy} setSortBy={setSortBy}/>
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Dashboard;