import express from 'express';
import {
  forgotpassword,
  login,
  resetpassword,
  signup,
} from '../controller/authcontroller.js';
import { upload } from '../controller/filecontrollers.js';
const router = express.Router();
router.post('/signup', upload.single('image'), signup);
router.post('/login', login);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);
export default router;
