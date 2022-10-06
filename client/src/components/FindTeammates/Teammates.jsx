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

// add the clicked team mate to group
export default function Teammates({players, user, setGroup, group}) {
  const addToGroup = (player) => {
    let id = player._id;
    if (!(group[id])) {
      let copy = {...group};
      copy[id] = player;
      setGroup(copy);
    }
  };

  return (
    <>
      <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg">
        {players.map((player) => {
          if (player._id !== user._id) {
            return (
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
                  <StyledButton string={'add to group'} onClick={() => addToGroup(player)}/>
                  <StyledButton string={'add to friends'}/>
                </Grid>
              </Card>
            )
          }
          return null;
        })}
      </SimpleGrid>
    </>
  );
}
