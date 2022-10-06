import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid, Text, Card } from '@mantine/core';
import Teammates from './Teammates.jsx';
import YourGroup from './YourGroup.jsx';
import { getUsersInSameCity } from '../../requests.js';

export default function FindTeammates({user}) {
  const [sortBy, setSortBy] = useState('location');
  const [players, setPlayers] = useState([]);
  const [group, setGroup] = useState({});

  useEffect(() => {
    let city = user.city;
    city = city.split(' ');
    let cityString = city.join('%20');
    getUsersInSameCity(cityString)
      .then((res) => setPlayers(res.data));
  },[group])

  return (
    <>
      <Grid gutter={40}>
        <Grid.Col span={3}>
          <YourGroup group={group}/>
        </Grid.Col>
        <Grid.Col span={8}>
          <p>Sort by:</p>
          <SegmentedControl styles={(theme) => ({
            root: {
              marginBottom: 30,
            }
          })}
            data={[
              { label: 'location', value: 'location' },
              { label: 'skill level', value: 'skill level' },
            ]}
            value={sortBy}
            onChange={setSortBy}
          />
          <Grid gutter={30}>
            <Teammates players={players} user={user} setGroup={setGroup} group={group}/>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}
