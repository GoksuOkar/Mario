import { Grid, Avatar, Card, Text, SimpleGrid } from '@mantine/core';

export default function Friends({ friends }) {
  if (friends) {
    return (
      <SimpleGrid m='auto'>
        <Text size={20} m='auto' weight='bolder'>
          FRIENDS
        </Text>
        <Grid m='auto'>
          {friends.map((friend) =>
            friend ? (
              <Card m='auto' key={friend._id}>
                <Avatar m='auto' src={friend.photo} />
                <Text>{friend.username}</Text>
              </Card>
            ) : null
          )}
        </Grid>
      </SimpleGrid>
    );
  }
}
