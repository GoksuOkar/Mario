import { Grid, Avatar, Card, Text } from '@mantine/core';
import players from '../FindTeammates/sampleTeammates.js';

export default function Friends() {
  const sty = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
  };
  return (
    // <div style={sty}>
    //   <div>
    //     {[...Array(6)].map((n, i) =>
    //       i % 2 === 0 ? (
    //         <div style={sty}>
    //           <Avatar />
    //           {`Friend ${i + 1}`}
    //         </div>
    //       ) : null
    //     )}
    //   </div>
    //   <div>
    //     {[...Array(6)].map((n, i) =>
    //       i % 2 === 1 ? (
    //         <div style={sty}>
    //           <Avatar />
    //           {`Friend ${i + 1}`}
    //         </div>
    //       ) : null
    //     )}
    //   </div>
    // </div>
    <>
      <Text>FRIENDS</Text>
      <Grid m='auto'>
        {players.map((player) => (
          <Card key={player._id}>
            <Avatar src={player.photo} />
            <Text>{player.name}</Text>
          </Card>
        ))}
      </Grid>
    </>
  );
}
