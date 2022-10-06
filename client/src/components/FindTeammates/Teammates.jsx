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

import { StyledButton } from '../../styledComponents/StyledButtons.js';

// add the clicked team mate to group
export default function Teammates({players, user, setGroup, group}) {
  const addToGroup = (player) => {
    let name = player.username;
    if (!(group[name])) {
      let copy = {...group};
      copy[name] = player;
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
                      src={player.picture}
                      alt='profile photo of player'
                      radius='xl'></Avatar>
                      <Text>{player.username}</Text>
                  </Grid.Col>
                  <Grid.Col>
                    <Text>Location: {player.city}</Text>
                    <Text>Level: {player.overallSkill}</Text>
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
