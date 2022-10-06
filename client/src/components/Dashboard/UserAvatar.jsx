import { Avatar, Tooltip } from '@mantine/core';
import { useState, useEffect } from 'react';
import please from '../../requests.js';

const UserAvatar = ({playerId, setDispId, setPage}) => {
  const [playerInfo, setPlayerInfo] = useState({})

  useEffect(() => {
    please.getCurrentUser(playerId)
    .then(data => setPlayerInfo(data.data))
    .catch(error => console.log(error))
  })
  return (
      // current data that we're getting back does not have person's name
    <Tooltip label={playerInfo.username}>
      <Avatar
      key={playerId}
      src={playerInfo.picture}
      alt='small picture of person attending'
      radius='xl'
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        setDispId(playerId);
        setPage('frnd');
      }}></Avatar>
    </Tooltip>
  )
}

export default UserAvatar;