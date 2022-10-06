import { useState, useEffect } from 'react';
import request from '../../requests.js';
// import GMap from './GMap.js';
import Info from './Info';
import Comments from './Comments.js';

//<GamePage gameid={event_id} userid={userId} set={setPage}/>


const GamePage = ({ gameid, userid, set }) => {
  const [game, setGame] = useState([]);

  useEffect(() => {
    request.getOneGame('633ca1f83a3cb5d9bdc3bfff').then((data) => {
      setGame(data.data);
    }).catch((err) => {
      console.log('this is a getOneGame error!', err);
    });

  }, [])


  return(
    // <GMap />
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

