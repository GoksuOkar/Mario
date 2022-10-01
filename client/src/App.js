import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Dropdown from '../src/components/Messages/Messages.js';
import NavBar from './components/NavBar.js';

const serverURL = 'http://localhost:3001';

export default function App() {
  axios
    .get(serverURL)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
      <Dropdown />
    </div>
  );
}
