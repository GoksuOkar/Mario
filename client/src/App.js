import React, { useState, useEffect } from 'react';
import { LoginView } from './Login/LoginView.js';
import Dropdown from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';
import axios from 'axios';

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState(true);
  const [page, setPage] = useState(null);

  const Axios = axios.create({
    baseURL: 'http://localhost:3001',
  });

  useEffect(() => {
    Axios
    .get('/auth', {withCredentials: true})
    .then((res) => {
      console.log(res);
      if (res.data.id !== null) {
        setUserId(res.data.id);
        setPage('games')
      }
    })
    .catch(() => setPage('login'));
  }, [Axios])

  return (
    <div className='App'>
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === 'login' ? (
        <LoginView setPage={setPage} setUserId={setUserId} userId={userId} />
      ) : null}
      {page === 'games' ? <Dashboard /> : null}
      {page === 'friends' ? <Dropdown /> : null}
      {page === 'profile' ? <ProfilePage /> : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
    </div>
  );
}
