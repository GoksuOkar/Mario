import { Grid, SimpleGrid, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile.js';
import Game from './Game.js';
import Friends from './Friends.js';
import sampleEvents from '../Dashboard/sampleData.js';
// eslint-disable-next-line
import ball from './ball.css';

export default function ProfilePage({ userId }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (userId) {
      axios
        .get(`/user/${userId}`)
        .then(({ data }) => setProfile(data))
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <Grid m='auto'>
      <div>
        {console.log(profile)}
        <Profile profile={profile} />
        <Friends friends={profile.friends} />
      </div>
      <SimpleGrid m='auto'>
        <Text size={25} weight='bolder'>
          Your Games
        </Text>
        <div className='events'>
          {sampleEvents.map((event) => (
            <Game key={event._id} event={event} />
          ))}
        </div>
      </SimpleGrid>
    </Grid>
  );
}
