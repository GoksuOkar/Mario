import { Grid, Avatar, Text, SimpleGrid, Divider } from '@mantine/core';

export default function Friends({ friends, setDispId, setPage }) {
  if (friends) {
    return (
      <SimpleGrid mt='xl'>
        <Text color='white' size={20} m='auto' weight='bolder'>
          FRIENDS
        </Text>
        <Divider></Divider>
        <Grid columns={5}>
          {friends.map((friend) =>
            friend ? (
              <Grid.Col key={friend._id} span={1}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setDispId(friend._id);
                    setPage('frnd');
                  }}>
                  <Avatar m='auto' src={friend.picture} />
                  <Text color='white' align='center'>
                    {friend.username}
                  </Text>
                </div>
              </Grid.Col>
            ) : null
          )}
        </Grid>
      </SimpleGrid>
    );
  }
}
