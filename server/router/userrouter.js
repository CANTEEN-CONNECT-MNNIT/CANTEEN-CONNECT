import express from 'express';
import {
  // deleteme,
  getme,
  // logout,
  update,
} from '../controller/usercontroller.js';
const router = express.Router();

router.patch('/update', update);
// router.get('/logout', logout);
router.get('/me', getme);
// router.delete('/delete/:id', deleteme);
export default router;
