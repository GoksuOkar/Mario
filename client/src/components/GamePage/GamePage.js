import { setState, useEffect } from 'react';
// import GMap from './GMap.js';
import Info from './Info';

const Game:
	{
    _id: 1,
    eventName: "Crash the Net",
    createdBy: "Blake",
    peopleAttending: [{user_id: 2 },{user_id: 3 }, {user_id: 6 } ],
    location: "1801-1899 Fell St, San Francisco, CA 94117, United States"
    startTime: "January 2, 2pm",
    endTime: "4pm",
    description: "This is the showdown between two rival teams: The Monstars and The San Jose Toonz! Don’t be late to this epic match!"
    Comments: [ {
        Body: "This place is ok"
        Username: "Pedro"
        Date: "December 12, 2:45am"
      }
    ]
  },




const GamePage = () => {

  // get info for the game


  return(
    // <GMap />
    <Info
      name={Game.eventName}
      createdBy={Game.createdBy}
      attending={Game.peopleAttending}
      location={Game.location}
      start={Game.startTime}
      end={Game.endTime}
      description={Game.description}
    />
  )
}

export default GamePage;

