import express from 'express';
import {
  getme,
  update,
  addfavourite,
  removefavourite,
  getfavourite,
} from '../controller/usercontroller.js';
import { logout, updatepassword } from '../controller/authcontroller.js';
import { upload } from '../controller/filecontrollers.js';
const router = express.Router();

router.patch('/update', upload.single('image'), update);
router.get('/logout', logout);
router.patch('/updatepassword', updatepassword);
router.get('/me', getme);
router.patch('/addfavourite', addfavourite);
router.patch('/removefavourite', removefavourite);
router.get('/favourite', getfavourite);
export default router;
