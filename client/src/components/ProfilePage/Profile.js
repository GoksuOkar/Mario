import { SimpleGrid, Grid, Avatar, Text, Button, Card } from '@mantine/core';
import bbimg from '../../assets/images/basketballicon.png';
import please from '../../requests';
// eslint-disable-next-line
import ball from './ball.css';
import EditStats from './EditStats';

export default function Profile({ updateUser, userObj, profile, page }) {
  const { dribbling, dunking, passing, shooting } = profile.stats || 0;
  const bbSty = {
    width: '25px',
    height: '25px',
  };

  const addFriend = () => {
    please
      .addFriend(userObj._id, profile._id)
      .then(() => updateUser())
      .catch((err) => console.log(err));
  };

  const unFriend = () => {
    please
      .unFriend(userObj._id, profile._id)
      .then(() => updateUser())
      .catch((err) => console.log(err));
  };
  return (
    <Card shadow='sm' p='lg' radius='md'>
      <Grid ml='lg'>
        <Avatar mr='lg' radius={100} size={200} src={profile.picture} />
        <div style={{ marginLeft: '10%' }}>
          <Text weight='bolder'>{profile.username}</Text>
          <Text>City: {profile.city}</Text>
          <Text>State: {profile.state}</Text>
          <Text>Games Attended: 43</Text>
          <Text>Prefered Role: {profile.preferedRole}</Text>
          <Text>Height: {profile.height}</Text>
          {page === 'profile' ? (
            <EditStats
              dunking={dunking}
              passing={passing}
              dribbling={dribbling}
              shooting={shooting}
              city={profile.city}
              state={profile.state}
              overallSkill={profile.overallSkill}
              picture={profile.picture}
              updateUserApp={updateUser}
              preferedRole={profile.preferedRole}
              height={profile.height}
              id={userObj._id}
            />
          ) : userObj.friends.includes(profile._id) ? (
            <Button onClick={unFriend}>Unfriend</Button>
          ) : (
            <Button onClick={addFriend}>Add Friend</Button>
          )}
        </div>
      </Grid>
      <SimpleGrid m='lg'>
        <Text size={20} m='auto' weight='bolder'>
          Skills
        </Text>
        <Grid m='auto'>
          <Text weight='bolder' align='right'>
            Overall
          </Text>
          <Text weight='bolder' ml='xs' transform='capitalize'>
            {profile.overallSkill}
          </Text>
        </Grid>
        <Grid ml='auto' mr='auto'>
          <Text align='right' mr='xl'>
            Dunkability
          </Text>
          {[...Array(dunking)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid ml='auto' mr='auto'>
          <Text align='right' mr='xl'>
            Defense
          </Text>
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
        <Grid ml='auto' mr='auto'>
          <Text align='right' mr='xl'>
            Shooting
          </Text>
          {[...Array(shooting)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid ml='auto' mr='auto'>
          <Text align='right' mr='xl'>
            Dribbling
          </Text>
          {[...Array(dribbling)].map((num, i) => (
            <img
              src={bbimg}
              alt='bbimg'
              style={bbSty}
              className={`roll${i}`}
              key={i}
            />
          ))}
        </Grid>
        <Grid ml='auto' mr='auto'>
          <Text align='right' mr='xl'>
            Passing
          </Text>
          {[...Array(passing)].map((num, i) => (
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
    </Card>
  );
}
