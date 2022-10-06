import React, { useState, useEffect } from 'react';
import { LoginView } from './Login/LoginView.js';
import { Messages } from '../src/components/Messages/Messages.js';

import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';

import Axios from '../src/requests';
import io from 'socket.io-client';
const socket = io('http://localhost:3001', {autoConnect: false});

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState("633ca1f73a3cb5d9bdc3bff5");
  const [userObj, setUserObj] = useState({});
  const [page, setPage] = useState(null);
  const [dispId, setDispId] = useState(userId);

  // checks if the user is already authenticated, sets the page to 'login' if not.
  useEffect(() => {
    Axios.authorize()
      .then((res) => {
        if (res.data.id !== null) {
          setUserId(res.data.id);
          setPage("games");
        }
      })
      .catch(() => setPage("login"));
  }, []);

  useEffect(() => {
    updateUser();
  }, [userId]);

  const updateUser = () => {
    Axios.getCurrentUser(userId)
      .then(({ data }) => setUserObj(data))
      .catch((err) => console.log(err));
  };

  console.log(userObj)

  return (
    <div className="App">
      <NavBar userId={userId} page={page} setPage={setPage} />
      {page === "login" ? (
        <LoginView setPage={setPage} setUserId={setUserId} userId={userId} />
      ) : null}
      {page === "games"
      ?
      <Dashboard
      userId={userId}
      setPage={setPage}
      setDispId={setDispId} />
      : null}
      {page === "profile" || page === "frnd" ? (
        <ProfilePage
          userObj={userObj}
          updateUser={updateUser}
          userId={userId}
          page={page}
          setPage={setPage}
          dispId={dispId}
          setDispId={setDispId}
        />
      ) : null}
      {page === 'findTeam' ? <FindTeammates /> : null}
      {page === 'messages' ? <Messages userObj = {userObj}/> : null}

    </div>
  );
}

export { socket };