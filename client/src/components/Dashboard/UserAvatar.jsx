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
    <>
      {
        playerInfo.username
        ?
        <Tooltip label={playerInfo.username}>
          <Avatar
          key={playerId}
          src={playerInfo.picture}
          alt='small picture of person attending'
          radius='xl'
          sx={{cursor: 'pointer'}}
          onClick={(event) => {
            event.stopPropagation();
            setDispId(playerId);
            setPage('frnd');
          }}></Avatar>
        </Tooltip>
        :
        <Avatar
        key={playerId}
        src={playerInfo.picture}
        alt='small picture of person attending'
        radius='xl'
        ></Avatar>
      }
    </>
  )
}

export default UserAvatar;