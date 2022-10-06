import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid, Text, Card } from '@mantine/core';
import Teammates from './Teammates.jsx';
import YourGroup from './YourGroup.jsx';
import { getUsersInSameCity } from '../../requests.js';

export default function FindTeammates({user}) {
  const [sortBy, setSortBy] = useState('location');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let city = user.city;
    city = city.split(' ');
    let cityString = city.join('%20');
    getUsersInSameCity(cityString)
      .then((res) => setPlayers(res.data));
  })

  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <YourGroup />
        </Grid.Col>
        <Grid.Col span={8}>
          <p>Sort by:</p>
          <SegmentedControl
            data={[
              { label: 'location', value: 'location' },
              { label: 'skill level', value: 'skill level' },
            ]}
            value={sortBy}
            onChange={setSortBy}
          />
          <Teammates players={players}/>
        </Grid.Col>
      </Grid>
    </>
  );
}
