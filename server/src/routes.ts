import { Router } from 'express';
import * as controllers from './controllers';



export const router = Router();

router.get('/auth', controllers.auth)
router.post('/register', controllers.register)
router.get('/login', controllers.login)
router.delete('/logout', controllers.logout);

router.get('/user/:userId', controllers.user)
router.get('/users/:userIds', controllers.users)