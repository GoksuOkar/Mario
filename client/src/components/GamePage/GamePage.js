import { useState, useEffect } from 'react';
import request from '../../requests.js';
// import GMap from './GMap.js';
import Info from './Info';
import Comments from './Comments.js';
import EventMap from './Map.js';

//<GamePage gameid={'633f3006ceae3af0c34eeea4'} userName={userObj.username} set={setPage}/>


const GamePage = ({ gameid, userName, set }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    request.getOneGame(gameid).then((data) => {
      setGame(data.data);
    }).catch((err) => {
      console.log('this is a getOneGame error!', err);
    });

  }, [])

  return(
    <div>
      <EventMap address={game.location} />
      <Info
        name={game.eventName}
        createdBy={game.creator}
        attending={game.peopleAttending}
        location={game.location}
        start={game.startTime}
        end={game.endTime}
        description={game.eventDescription}
        set={set}
        />
      <Comments
        name={userName}
        eventID={gameid}
      />
    </div>
  )
}

export default GamePage;

