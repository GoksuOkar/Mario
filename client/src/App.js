import React, { useState } from 'react';
import io from 'socket.io-client';

import LoginView from './Login/LoginView.js';
import { Messages } from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';
import Friends from './components/ProfilePage/Friends.js';

const socket = io.connect('http://localhost:3001');

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState(true);
  const [page, setPage] = useState('messages');
  const username = 'LukItsIvan';

  console.log(username);

  return (
    <div className='App'>
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === 'login' ? (
        <LoginView login={setUserId} userId={userId} />
      ) : null}
      {page === 'games' ? <Dashboard /> : null}
      {page === 'friends' ? <Friends /> : null}
      {page === 'profile' ? <ProfilePage /> : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
      {page === 'messages' ? <Messages username = {username}/> : null}
    </div>
  );
}

export { socket };