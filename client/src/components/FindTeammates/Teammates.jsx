import {
  SegmentedControl,
  Avatar,
  SimpleGrid,
  Grid,
  Text,
  Card,
  Divider,
  Group,
  createStyles
} from '@mantine/core';

import { StyledButton } from '../../styledComponents/Button.js';

// later: replace this with prop

export default function Teammates({players}) {
  return (
    <>
      <Grid gutter="lg">
        {players.map((player) => (
          <Card key={player._id} shadow='sm' p='lg' radius='md'>
            <Grid>
              <Grid.Col span={1}>
                <Avatar
                  src={player.photo}
                  alt='profile photo of player'
                  radius='xl'></Avatar>
              </Grid.Col>
              <Grid.Col>
                <Text>{player.username}</Text>
                <Text>{player.city}</Text>
                <Text>{player.overallSkill}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <StyledButton string={'add to group'}/>
              <StyledButton string={'add to friends'}/>
            </Grid>
          </Card>
        ))}
      </Grid>
    </>
  );
}
