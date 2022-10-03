import React, { useState } from 'react';
import LoginView from './Login/LoginView.js';
import Dropdown from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import FindTeammates from './components/FindTeammates/FindTeammates.jsx';

export default function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState(null);

  return (
    <div className='App'>
      <ProfilePage />
      <NavBar />
      {!userId && <LoginView login={setUserId} userId={userId} />}
      {userId && (
        <div>
          <Dropdown />
          <Dashboard />
          <FindTeammates />
        </div>
      )}
    </div>
  );
}
