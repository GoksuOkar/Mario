import { Avatar, Tooltip } from '@mantine/core';
import { useState, useEffect } from 'react';

const UserAvatar = ({playerId, setDispId, setPage}) => {
  const [playerInfo, setPlayerInfo] = useState({})

  useEffect(() => {

  })
  return (
      // current data that we're getting back does not have person's name
    <Tooltip label={playerInfo.username}>
      <Avatar
      key={playerId}
      src={playerInfo.picture}
      alt='small picture of person attending'
      radius='xl'
      onClick={() => {
        setDispId(playerId);
        setPage('frnd');
      }}></Avatar>
    </Tooltip>
  )
}

export default UserAvatar;