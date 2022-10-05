import { Router } from 'express';
import * as controllers from './controllers';



export const router = Router();
// AUTH
router.get('/auth', controllers.auth)
router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.delete('/logout', controllers.logout);

// // GAMES
router.get('/games', controllers.getGames)
// router.post('./games', )

// // USERS
router.get('/users', controllers.getUserInfo)
router.get('/friends', controllers.getFriends)

// // CONVERSATIONS
