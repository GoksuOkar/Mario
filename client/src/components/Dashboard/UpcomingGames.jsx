import { Card, Text, Divider, ScrollArea } from '@mantine/core';
import moment from 'moment';

const UpcomingGames = ({myGames}) => {
  return (
    // later: put this in a grid and size it
    <Card shadow='sm' p='xs' radius='md' sx={{backgroundColor: '#f1f3f5'}}>
        <Text size='xl' align='center'>Your games</Text>
        <Divider my='sm'size='md'/>
        <ScrollArea type='hover' style={{height: '500px'}}>
          {myGames.map(game =>
            <Card key={game._id} sx={{backgroundColor: 'white', marginTop: '6px'}}>
              <Text>
                {game.eventName}
              </Text>
              <Text>
                {/* calulate distance in miles */}
                Miles from you
              </Text>
              <Text>
                {moment(game.startTime).calendar()}
              </Text>
            </Card>
          )}
        </ScrollArea>
    </Card>
  )
}

export default UpcomingGames;