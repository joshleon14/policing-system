import express from 'express';
import { SignUpController, LoginController, VerifyTokenController } from '../controllers/auth'


const router = express.Router();

// route to signup user.
router.post('/signup', SignUpController);


// route to login user.
router.post('/login', LoginController);

// route to verify token
router.post('/verify', VerifyTokenController);


export default router;