import { Avatar } from '@mantine/core';
import bbimg from '../../assets/images/basketballicon.png';
import ball from './ball.css';

export default function Profile() {
  const picSty = { borderRadius: '25px' };
  const bbSty = {
    width: '15px',
    height: '15px',
  };
  return (
    <div>
      <Avatar
        sx={picSty}
        src='https://cdn.nba.com/headshots/nba/latest/1040x760/977.png'
      />
      Edit Stats
      <br />
      Games Attended: 43
      <br />
      Prefered Role: Guard
      <br />
      Height: 6'2"
      <br />
      Skills
      <br />
      Dunkability
      {[...Array(5)].map((num, i) => (
        <img
          src={bbimg}
          alt='bbimg'
          style={bbSty}
          className={`roll${i}`}
          key={i}
        />
      ))}
      <br />
      Defense
      {[...Array(5)].map((num, i) => (
        <img
          src={bbimg}
          alt='bbimg'
          style={bbSty}
          className={`roll${i}`}
          key={i}
        />
      ))}
      <br />
      Shooting
      {[...Array(5)].map((num, i) => (
        <img
          src={bbimg}
          alt='bbimg'
          style={bbSty}
          className={`roll${i}`}
          key={i}
        />
      ))}
      <br />
      Dribbling
      {[...Array(5)].map((num, i) => (
        <img
          src={bbimg}
          alt='bbimg'
          style={bbSty}
          className={`roll${i}`}
          key={i}
        />
      ))}
      <br />
      Passing
      {[...Array(5)].map((num, i) => (
        <img
          src={bbimg}
          alt='bbimg'
          style={bbSty}
          className={`roll${i}`}
          key={i}
        />
      ))}
    </div>
  );
}
