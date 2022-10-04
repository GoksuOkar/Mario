import { SimpleGrid, Grid, Avatar, Text } from '@mantine/core';
import bbimg from '../../assets/images/basketballicon.png';
// eslint-disable-next-line
import ball from './ball.css';

export default function Profile({ profile }) {
  const bbSty = {
    width: '25px',
    height: '25px',
  };
  return (
    <div>
      <Grid m='5%'>
        <Avatar
          m='auto'
          radius={100}
          size={100}
          src='https://cdn.nba.com/headshots/nba/latest/1040x760/977.png'
        />
        <div>
          <Text>Games Attended: 43</Text>
          <Text>Prefered Role: Guard</Text>
          <Text>Height: 6'6"</Text>
        </div>
      </Grid>
      <SimpleGrid m='5%'>
        <Text size={20} m='auto' weight={'bolder'}>
          Skills
        </Text>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Overall</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Dunkability</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Defense</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Shooting</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Dribbling</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid m='auto'>
          <Text sx={{ width: '85px' }}>Passing</Text>
          {[...Array(5)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
      </SimpleGrid>
    </div>
  );
}
