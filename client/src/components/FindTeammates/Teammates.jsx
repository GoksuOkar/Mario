import { SegmentedControl, Button, Avatar, SimpleGrid, Grid, Text, Card, Divider } from '@mantine/core';

// later: replace this with prop
const players = require('./sampleTeammates.js')

const Teammates = () => {
  return (
    <>
      <Grid>
        {players.map(player =>
          <Card key={player._id} shadow='sm' p='lg' radius='md'>
            <Grid>
              <Grid.Col span={1}>
                <Avatar src={player.photo} alt='profile photo of player' radius='xl'>
                </Avatar>
              </Grid.Col>
              <Grid.Col span={5}>
                <Text>{player.name}</Text>
                <Text>{player.city}</Text>
                <Text>{player.skillLevel}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Button variant='light' size='xs'>Add to group</Button>
              <Button variant='light' size='xs'>Add to friends</Button>
            </Grid>
          </Card>
        )}
      </Grid>
    </>
  )
}

export default Teammates;