import express from 'express';
import {
  getme,
  update,
  addfavourite,
  removefavourite,
} from '../controller/usercontroller.js';
import { logout, updatepassword } from '../controller/authcontroller.js';
const router = express.Router();

router.patch('/update', update);
router.get('/logout', logout);
router.patch('/updatepassword', updatepassword);
router.get('/me', getme);
router.patch('/addfavourite', addfavourite);
router.patch('/removefavourite', removefavourite);
export default router;
