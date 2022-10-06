import { Router } from 'express';
import { resourceLimits } from 'worker_threads';
import * as controllers from './controllers';



export const router = Router();
/***************AUTH*******************/
router.get('/auth', controllers.auth)
router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/googleLogin', controllers.googleLogin);
router.delete('/logout', controllers.logout);

/***************GAMES*******************/
router.get('/games', controllers.getGames)
router.get('/game', controllers.getGame)
router.put('/game/join', controllers.joinGame)
router.put('/game/leave', controllers.leaveGame)
router.post('/game', controllers.createGame)

/***************COMMENTS*******************/
router.get('/comments', controllers.getComments)

/***************USERS*******************/
router.get('/users', controllers.getUserInfo)
router.get('/users/:city', controllers.getUsersInState)
router.get('/currentUser', controllers.getCurrentUser)
router.put('/addFriend', controllers.addFriend)
router.put('/unFriend', controllers.unFriend)
router.put('/updateUser', controllers.updateUser)

/***************CONVERSATIONS*******************/

