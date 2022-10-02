import Profile from './Profile.js';
import Game from './Game.js';

export default function ProfilePage() {
  const sty = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  };
  return (
    <div style={sty}>
      <Profile />
      <div>
        Your games
        {[...Array(5)].map((n, i) => (
          <Game key={i} />
        ))}
      </div>
    </div>
  );
}
