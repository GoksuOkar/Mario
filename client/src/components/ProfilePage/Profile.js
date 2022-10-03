import { SimpleGrid, Grid, Avatar, Text } from '@mantine/core';
import bbimg from '../../assets/images/basketballicon.png';
import ball from './ball.css';

export default function Profile() {
  const bbSty = {
    width: '15px',
    height: '15px',
  };
  return (
    <div>
      <Grid m='5%'>
        <Avatar
          radius={100}
          size={100}
          src='https://cdn.nba.com/headshots/nba/latest/1040x760/977.png'
        />
        <SimpleGrid m='auto'>
          <Text>Games Attended: 43</Text>
          <Text>Prefered Role: Guard</Text>
          <Text>Height: 6'6"</Text>
        </SimpleGrid>
      </Grid>
      <SimpleGrid m='5%'>
        <Text m='auto' weight={'bolder'}>
          Skills
        </Text>
        <Grid m='auto'>
          <Text>Overall</Text>
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
          <Text>Dunkability</Text>
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
          <Text>Defense</Text>
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
          <Text>Shooting</Text>
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
          <Text>Dribbling</Text>
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
          <Text>Passing</Text>
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
