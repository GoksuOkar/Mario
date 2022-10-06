import { useState, useEffect } from 'react';
import request from '../../requests.js';
// import GMap from './GMap.js';
import Info from './Info';
import Comments from './Comments.js';

//<GamePage gameid={event_id} userid={userId} set={setPage}/>


const GamePage = ({ gameid, userid, set }) => {
  const [game, setGame] = useState([]);

  useEffect(() => {
    request.getOneGame('633f0c4a19cc8b5cf1ba79bc').then((data) => {
      setGame(data.data);
    }).catch((err) => {
      console.log('this is a getOneGame error!', err);
    });

  }, [])


  return(
    <div>
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
        name={userid}
        eventID={game._id}
      />
    </div>
  )
}

export default GamePage;

