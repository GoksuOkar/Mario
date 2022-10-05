import { sampleEvents } from './sampleEvents';
import { samplePlayers } from './samplePlayers';
import session from 'express-session';
import mongoDBSession from 'connect-mongodb-session';
import * as db from '../BlueOceanSchema';

// compile this with npx tsc first and then run node <JS compiled file in dist>

const store = mongoDBSession(session)
const Store = new store({
  // uri:'mongodb://localhost/AlleyOops',
  uri:'mongodb://Kobe:Bryant@18.144.12.217/AlleyOops',
  collection: 'mySessions'
})

const loadData = async () => {
  try {
    await db.User.insertMany(samplePlayers);
    let players = await db.User.find({});

    // have one player create each event
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      let newEvent = sampleEvents[i];
      newEvent.creator = player._id.toString(); //should creator be the name or id?
      await db.Event.create(newEvent);
    }
    // populate each event with all sample players
    let events = await db.Event.find({});
    for (let event of events) {
      players.forEach(player => event.peopleAttending.push(player._id.toString()));
      await event.save();
    }

    // have each player befriend everyone else
    for (let player of players) {
      players.forEach(person => person._id !== player._id ? player.friends.push(person._id.toString()): null)
      await player.save()
    }

  } catch (err) {
    console.log(err);
  }
}

loadData();


// steps:
// connect to database
// insert users
// retrieve users, pick a random user to create the events
// retrieve events and populate it: creater as current user, people attending as all sample players
// retrieve users, have them friend everyone else