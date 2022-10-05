import { Router } from 'express';
import * as controllers from './controllers';



export const router = Router();
/***************AUTH*******************/
router.get('/auth', controllers.auth)
router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.delete('/logout', controllers.logout);

/***************GAMES*******************/
router.get('/games', controllers.getGames)
router.get('/game', controllers.getGame)
router.put('/game/join', controllers.joinGame)
// router.post('./games', )

/***************COMMENTS*******************/
router.get('/comments', controllers.getComments)

/***************USERS*******************/
router.get('/users', controllers.getUserInfo)
router.get('/currentUser', controllers.getCurrentUser)
router.put('/addFriend', controllers.addFriend)
router.put('/unFriend', controllers.unFriend)

/***************CONVERSATIONS*******************/
