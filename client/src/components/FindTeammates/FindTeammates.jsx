import React, { useState } from 'react';
import { SegmentedControl, Button, Grid, Text, Card } from '@mantine/core';
import Teammates from './Teammates.jsx';
import YourGroup from './YourGroup.jsx';

export default function FindTeammates() {
  const [sortBy, setSortBy] = useState('location');

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
          <Teammates />
        </Grid.Col>
      </Grid>
    </>
  );
}
