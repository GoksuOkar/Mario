import './dashboard.css'
import React, { useState, useEffect } from 'react';
import { SegmentedControl, Button, Grid, SimpleGrid } from '@mantine/core';
import EventCard from './EventCard.jsx';
import UpcomingGames from './UpcomingGames.jsx';
import MakeGame from './MakeGame.jsx';
import please from '../../requests.js';
import basketballOutline from '../../assets/images/basketballOutline.png';

const Dashboard = ({ userId, setPage, setDispId }) => {
  const [sortBy, setSortBy] = useState('upcoming');
  const [formOpen, setFormOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const [myGameIds, setMyGameIds] = useState([]);

  const updateUserInfo = () => {
    please
      .getUserInfo(userId)
      .then((data) => {
        let events = data.data.events;
        let eventIds = events.map((event) => event._id);
        setMyGames(events);
        setMyGameIds(eventIds);
      })
      .catch((error) => console.log(error));
  };

  const getGames = () => {
    console.log('sort crit is', sortBy, 'userid', userId);
    please
      .getAllGames('San Jose', 'CA', sortBy, userId)
      .then((data) => setGames(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGames();
  }, [sortBy, formOpen])

  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <div style={{ margin: '40px' }}>
      <Grid grow>
        <Grid.Col span={1}>
          <UpcomingGames myGames={myGames} />
          {/* later: turn this into a basketball */}
          {/* link this to open up modal form */}
          <div id='button-ctn'>
            <img id='basketball-outline' src={basketballOutline}/>
            <button type='button' onClick={() => setFormOpen(true)}>Make Game</button>
          </div>
          {formOpen && <MakeGame setFormOpen={setFormOpen} userId={userId} />}
        </Grid.Col>
        <Grid.Col span={9}>
          <SimpleGrid>
            <SegmentedControl
              data={[
                { label: 'upcoming', value: 'upcoming' },
                // {label: 'nearest to me', value: 'distance'},
                { label: 'with friends attending', value: 'friends' },
              ]}
              value={sortBy}
              onChange={setSortBy}
            />
          </SimpleGrid>
          {games ? (
            <Grid>
              {games.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  userId={userId}
                  myGameIds={myGameIds}
                  updateUserInfo={updateUserInfo}
                  setDispId={setDispId}
                  setPage={setPage}
                />
              ))}
            </Grid>
          ) : null}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
