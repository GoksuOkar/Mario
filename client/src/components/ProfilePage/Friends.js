import { Avatar } from '@mantine/core';

export default function Friends() {
  const sty = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
  };
  return (
    <div style={sty}>
      <div>
        {[...Array(6)].map((n, i) =>
          i % 2 === 0 ? (
            <div style={sty}>
              <Avatar />
              {`Friend ${i + 1}`}
            </div>
          ) : null
        )}
      </div>
      <div>
        {[...Array(6)].map((n, i) =>
          i % 2 === 1 ? (
            <div style={sty}>
              <Avatar />
              {`Friend ${i + 1}`}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
