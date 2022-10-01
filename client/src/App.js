import React, { useState } from 'react';
import './App.css';
import LoginView from './Login/LoginView.js'

const serverURL = 'http://localhost:3001'

function App() {
  //const divRef = useRef(true);
  const [userId, setUserId] = useState(true);

  return (
    <div className="App">
      {!userId && <LoginView login={setUserId} userId={userId}/>}
      {userId && <div>Hello {userId}</div>}
    </div>
  );
}

export default App;
