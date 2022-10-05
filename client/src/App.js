import React, { useState, useEffect } from 'react';
import { LoginView } from './Login/LoginView.js';
import { Messages } from '../src/components/Messages/Messages.js';

import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';

// eslint-disable-next-line
import axios from 'axios';
import io from 'socket.io-client'
import please from '../src/requests';

const socket = io('http://localhost:3001', {autoConnect: false});

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState('633ca1f73a3cb5d9bdc3bff5');
  const [userObj, setUserObj] = useState({});
  const [page, setPage] = useState(null);

  const Axios = axios.create({
    baseURL: 'http://localhost:3001',
  });

  // checks if the user is already authenticated, sets the page to 'login' if not.
  useEffect(() => {
    please
      .getUserInfo(userId)
      .then(({ data }) => setUserObj(data))
      .catch((err) => console.log(err));

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
      {console.log(userObj)}
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === 'login' ? (
        <LoginView setPage={setPage} setUserId={setUserId} userId={userId} />
      ) : null}
      {/* {page === 'friends' ? <Dropdown /> : null} */}
      {page === 'games' ? <Dashboard userId={userId}/> : null}
      {page === 'profile' || page === 'frnd' ? (
        <ProfilePage userId={userId} page={page} setPage={setPage} />
      ) : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
      {page === 'messages' ? <Messages userObj = {userObj}/> : null}
    </div>
  );
}

export { socket };