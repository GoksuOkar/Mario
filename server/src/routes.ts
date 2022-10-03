import { Router } from 'express';
import * as controllers from './controllers';



export const router = Router();

router.get('/register', controllers.register)
router.get('/login', controllers.login)
