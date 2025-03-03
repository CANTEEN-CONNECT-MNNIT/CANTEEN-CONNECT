import express from 'express';
import {
  forgotpassword,
  login,
  resetpassword,
  signup,
} from '../controller/authcontroller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);
export default router;
