import {Request, Response} from "express";
import * as db from './db/BlueOceanSchema';  // db object has models as property
import bcrypt from 'bcryptjs';

export function register (req: Request, res: Response): void {
  const {email, username, password} = req.body;
  db.User.findOne({email: email})

  .then((result) => {
    // if there is one in the database send back that it already exists
    if (result) {
      res.status(300).send('already exists');

    } else {
      // if not in database create a new one and send back new user id
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.User.create({email: email, username: username, password: hashedPassword})

      .then((result) => {
        const id = result._id.toString();

        // set the session to be authorized and have user id
        req.session.isAuth = true;
        req.session.user = id;
        res.send({id: result._id}).status(201);
      })
    }
  })

  .catch((err) => {
    console.log(err)
    res.sendStatus(404);
  })
}

export function login (req: Request, res: Response): void {
  console.log(req.session);
  const {email, password} = req.body;
  db.User.findOne({email: email})
  .then ((result) => {
    // if there is a user
    if (result) {
      // check if hashed password matches
      const isMatch = bcrypt.compareSync(password, result.password)
      if (isMatch) {
        // change new user id to a string to add to session
        const id = result._id.toString();

        // set the session to be authorized and have user id
        req.session.isAuth = true;
        req.session.user = id;
        res.send({id: result._id}).status(201);
      } else {
        // if login failed session is not authorized
        req.session.isAuth = false;
        res.sendStatus(401)
      }
    } else {
      // if no matches in data base
      req.session.isAuth = false;
      res.sendStatus(401);
    }
  })
  .catch((err) => {
    // if login failed session is not authorized
    req.session.isAuth = false;
    console.log(err);
    res.sendStatus(401);
  })
}

export function logout (req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      res.send('unable to log out').status(404);
    } else {
      res.sendStatus(200);
    }
  })
}

export function auth (req: Request, res: Response) {
  console.log('session', req.session);
  if (req.session.isAuth === true)  {
    res.send({id: req.session.user}).status(200)
  } else {
    res.status(404).send({id: null})
  }
}

/************************GAMES************************/
export async function getGames (req: Request, res: Response) {
  console.log('received request with these params:',req.query)
  let { gameIds} = req.query;
  if (gameIds) {
    // case1 : get games based on array of ids
    let results = [];
    // this is not best practice but it works for now, the incoming array of gameIds should be in json
    gameIds = JSON.parse(gameIds);
    for (let gameId of gameIds) {
      try {
        let result = await db.Event.findById(gameId);
        results.push(result);
      } catch (error) {
        // just don't push to results
        console.log(error);
      }
    }
    res.send(results);
  } else {
    // case2 : get all games
    try {
      let results = await db.Event.find({});
      res.send(results);
    } catch (error) {
      res.sendStatus(404);
    }
  }
}

export async function getGame (req:Request, res: Response) {
  try {
    let game = await db.Event.find({_id: req.query.id})
    res.status(200).send(game[0])
  } catch (err)  {
    console.log(err)
    res.sendStatus(404);
  }
}

export async function joinGame (req:Request, res: Response) {
  let userId = req.body.userId;
  let eventId = req.body.eventId;
  console.log(userId, eventId)
  try{
    let user = await db.User.updateOne({_id: userId}, {$addToSet: {events: eventId}})
    let event = await db.Event.updateOne({_id: eventId}, {$addToSet: {peopleAttending: userId}})
    let result = {user: user, event: event}
    res.status(200).send(result);
  } catch(err) {
    console.log(err)
    res.sendStatus(404)
  }
}

/************************USERS************************/
export async function getUserInfo (req: Request, res: Response) {
  try {
    // search user by Id
  } catch (error) {

  }
}

export async function getFriends (req: Request, res: Response) {
  try {
    // search friends by array of IDs
  } catch (error) {

  }
}

export async function getComments (req: Request, res: Response) {
  try {
    let comments = await db.Comment.find({event_id: req.query.eventId})
    res.status(200).send(comments);
  } catch (err) {
    console.log(err)
    res.sendStatus(404)
  }
}

