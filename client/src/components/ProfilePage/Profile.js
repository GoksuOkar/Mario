import { SimpleGrid, Grid, Avatar, Text, Button, Card } from '@mantine/core';
import bbimg from '../../assets/images/basketballicon.png';
import please from '../../requests';
// eslint-disable-next-line
import ball from './ball.css';
import EditStats from './EditStats';

export default function Profile({ updateUser, userObj, profile, page }) {
  const { dribbling, dunking, passing, shooting } = userObj.stats || 0;
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
          <Text size={25} weight='bolder'>
            {profile.username}
          </Text>
          <Text size={20}>City: {profile.city}</Text>
          <Text size={20}>State: {profile.state}</Text>
          <Text size={20}>Prefered Role: {profile.preferedRole}</Text>
          <Text size={20}>Height: {profile.height}</Text>
          {page === 'profile' ? (
            <EditStats
              userObj={userObj}
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
        <Grid m='auto' columns={2}>
          <div style={{ width: '200px' }}>
            <Text weight='bolder' align='right'>
              Overall
            </Text>
          </div>
          <div style={{ width: '200px' }}>
            <Text weight='bolder' ml='xs' transform='capitalize'>
              {profile.overallSkill}
            </Text>
          </div>
        </Grid>
        <Grid ml='auto' mr='auto' columns={2}>
          <div style={{ width: '200px' }}>
            <Text align='right'>Dunkability</Text>
          </div>
          <div style={{ width: '200px' }}>
            {[...Array(dunking)].map((num, i) => (
              <img
                src={bbimg}
                alt='bbimg'
                style={bbSty}
                className={`roll${i}`}
                key={i}
              />
            ))}
          </div>
        </Grid>
        <Grid ml='auto' mr='auto' columns={2}>
          <div style={{ width: '200px' }}>
            <Text align='right'>Shooting</Text>
          </div>
          <div style={{ width: '200px' }}>
            {[...Array(shooting)].map((num, i) => (
              <img
                src={bbimg}
                alt='bbimg'
                style={bbSty}
                className={`roll${i}`}
                key={i}
              />
            ))}
          </div>
        </Grid>
        <Grid ml='auto' mr='auto'>
          <div style={{ width: '200px' }}>
            <Text align='right'>Dribbling</Text>
          </div>
          <div style={{ width: '200px' }}>
            {[...Array(dribbling)].map((num, i) => (
              <img
                src={bbimg}
                alt='bbimg'
                style={bbSty}
                className={`roll${i}`}
                key={i}
              />
            ))}
          </div>
        </Grid>
        <Grid ml='auto' mr='auto'>
          <div style={{ width: '200px' }}>
            <Text align='right'>Passing</Text>
          </div>
          <div style={{ width: '200px' }}>
            {[...Array(passing)].map((num, i) => (
              <img
                src={bbimg}
                alt='bbimg'
                style={bbSty}
                className={`roll${i}`}
                key={i}
              />
            ))}
          </div>
        </Grid>
      </SimpleGrid>
    </Card>
  );
}
