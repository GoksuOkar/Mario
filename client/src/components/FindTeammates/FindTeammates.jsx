import React, { useState, useEffect } from 'react';
import { Grid } from '@mantine/core';
import Teammates from './Teammates.jsx';
import YourGroup from './YourGroup.jsx';
import { getUsersInSameCity } from '../../requests.js';

export default function FindTeammates({ user, setPage, name }) {
  // eslint-disable-next-line no-undef
  const [players, setPlayers] = useState([]);
  const [group, setGroup] = useState({[name]: user});

  useEffect(() => {
    let city = user.city || 'San Jose';
    city = city.split(' ');
    let cityString = city.join('%20');
    getUsersInSameCity(cityString).then((res) => setPlayers(res.data));
  }, [group]);

  return (
    <>
      <Grid gutter={40}>
        <Grid.Col span={12}></Grid.Col>
          <Grid.Col span={3}>
            <YourGroup group={group} user={user} setPage={setPage} />
          </Grid.Col>
          <Grid.Col span={9}>
            <Teammates
              players={players}
              user={user}
              setGroup={setGroup}
              group={group}
            />
        </Grid.Col>
      </Grid>
    </>
  );
}
