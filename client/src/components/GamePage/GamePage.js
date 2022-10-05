import { useState, useEffect } from 'react';
import axios from 'axios';
// import GMap from './GMap.js';
import Info from './Info';
import Comments from './Comments.js';

//<GamePage gameid={event_id} userid={userId} set={setPage}/>


const GamePage = ({ gameid, userid, set }) => {
  const [game, setGame] = useState([]);

  useEffect(() => {
    //query game info here using the gameid
    axios.get('/event', {params: {event_id: gameid}}).then((data) => {
      console.log(data.data);
      setGame(data.data);
    })
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
        eventID={}
      />
    </div>
  )
}

export default GamePage;

