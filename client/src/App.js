import React, { useState } from 'react';
import LoginView from './Login/LoginView.js';
import Dropdown from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState('633ca1f73a3cb5d9bdc3bff5');
  const [page, setPage] = useState('login');

  return (
    <div className='App'>
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === 'login' ? (
        <LoginView login={setUserId} userId={userId} />
      ) : null}
      {page === 'games' ? <Dashboard /> : null}
      {page === 'friends' ? <Dropdown /> : null}
      {page === 'profile' ? <ProfilePage userId={userId} /> : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
    </div>
  );
}
