import { sampleEvents } from './sampleEvents';
import { samplePlayers } from './samplePlayers';
import session from 'express-session';
import mongoDBSession from 'connect-mongodb-session';
import * as db from '../BlueOceanSchema';
import dotenv from 'dotenv';

dotenv.config();

// compile this with npx tsc first and then run node <JS compiled file in dist>

const store = mongoDBSession(session)
const Store = new store({
  uri:`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@18.144.12.217/${process.env.DBNAME}`,
  collection: 'mySessions'
})

const loadData = async () => {
  try {
    await db.User.insertMany(samplePlayers);
    let players = await db.User.find({});
    for (let i = 0; i < sampleEvents.length; i++) {
      let newEvent = sampleEvents[i];
      newEvent.creator = players[i]._id.toString()
      await db.Event.create(newEvent);
    }

    // populate each event with all current players
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

const deleteEverything = async () => {
  try {
    await db.User.deleteMany({});
    await db.Event.deleteMany({});
  } catch (error) {
    console.log(error);
  }
}
// turn this own to manually delete documents if we're unable to drop database
// deleteEverything();

loadData();


// steps:
// connect to database
// insert users
// retrieve users, pick a random user to create the events
// retrieve events and populate it: creater as current user, people attending as all sample players
// retrieve users, have them friend everyone else