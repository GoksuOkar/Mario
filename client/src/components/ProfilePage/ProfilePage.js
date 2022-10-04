import Profile from './Profile.js';
import Game from './Game.js';
import Friends from './Friends.js';
import sampleEvents from '../Dashboard/sampleData.js';

export default function ProfilePage() {
  const sty = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  };
  return (
    <div style={sty}>
      <div>
        <Profile />
        <Friends />
      </div>
      <div>
        Your games
        {sampleEvents.map((event) => (
          <Game key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
