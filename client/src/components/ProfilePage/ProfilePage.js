import Profile from './Profile.js';
import Game from './Game.js';
import Friends from './Friends.js';

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
        {[...Array(5)].map((n, i) => (
          <Game key={i} />
        ))}
      </div>
    </div>
  );
}
