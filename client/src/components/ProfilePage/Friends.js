import { Grid, Avatar, Card, Text, SimpleGrid } from '@mantine/core';

export default function Friends({ friends, setDispId, setPage }) {
  if (friends) {
    return (
      <SimpleGrid>
        <Text size={20} m='auto' weight='bolder'>
          FRIENDS
        </Text>
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
                  <Avatar m='auto' src={friend.photo} />
                  <Text align='center'>{friend.username}</Text>
                </div>
              </Grid.Col>
            ) : null
          )}
        </Grid>
      </SimpleGrid>
    );
  }
}
