import { Avatar, Grid, SimpleGrid, Text } from '@mantine/core';
import sampleTeammates from '../FindTeammates/sampleTeammates.js';

export default function Game({ event }) {
  // const sty = {
  //   border: '1px solid lightgray',
  //   display: 'flex',
  //   flexDirection: 'row',
  // };
  // const plyrSty = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   placeContent: 'center',
  // };
  // const listSty = {
  //   display: 'flex',
  //   flexDirection: 'row',
  // };

  return (
    <Grid sx={{ border: '1px solid lightgray' }}>
      <Grid>
        {sampleTeammates.map((player) => (
          <Avatar key={player._id} src={player.photo} radius={100} />
        ))}
      </Grid>
      <SimpleGrid>
        <Text>{event.eventName}</Text>
        <Text>{event.location}</Text>
        <Text>{event.startTime}</Text>
      </SimpleGrid>
    </Grid>

    // <div style={sty}>
    //   <div style={plyrSty}>
    //     <div style={listSty}>
    //       {[...Array(10)].map((n, i) =>
    //         i % 2 === 0 ? (
    //           <Avatar
    //             key={i}
    //             radius={25}
    //             size={25}
    //             src='https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png'
    //           />
    //         ) : null
    //       )}
    //     </div>
    //     <div style={listSty}>
    //       {[...Array(10)].map((n, i) =>
    //         i % 2 === 1 ? (
    //           <Avatar
    //             key={i}
    //             radius={25}
    //             size={25}
    //             src='https://cdn.nba.com/headshots/nba/latest/1040x760/977.png'
    //           />
    //         ) : null
    //       )}
    //     </div>
    //   </div>
    //   <div>
    //     <b>Hoops on Fourth</b>
    //     <br />
    //     123 Fouth St, San Jose
    //     <br />
    //     <em>8 miles from you</em>
    //     <br />
    //     Time: 6pm-8pm
    //   </div>
    // </div>
  );
}
