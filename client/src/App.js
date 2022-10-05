import React, { useState, useEffect } from 'react';
import { LoginView } from './Login/LoginView.js';
import Dropdown from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';
import GamePage from './components/GamePage/GamePage.js';
// eslint-disable-next-line
import axios from 'axios';

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState('633ca1f73a3cb5d9bdc3bff5');
  const [page, setPage] = useState(null);

  const Axios = axios.create({
    baseURL: 'http://localhost:3001',
  });

  // checks if the user is already authenticated, sets the page to 'login' if not.
  useEffect(() => {
    Axios.get('/auth', { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.id !== null) {
          setUserId(res.data.id);
          setPage('games');
        }
      })
      .catch(() => setPage('login'));
  }, []);

  return (
    <div className='App'>
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === 'login' ? (
        <LoginView setPage={setPage} setUserId={setUserId} userId={userId} />
      ) : null}
      {page === 'games' ? <Dashboard /> : null}
      {page === 'friends' ? <Dropdown /> : null}
      {page === 'profile' || page === 'frnd' ? (
        <ProfilePage userId={userId} page={page} setPage={setPage} />
      ) : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
      <GamePage
        gameid={'633ca1f83a3cb5d9bdc3bffd'} userid={'633ca1f73a3cb5d9bdc3bff4'} set={setPage}
      />
    </div>
  );
}
