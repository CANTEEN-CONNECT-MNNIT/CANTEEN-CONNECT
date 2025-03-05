import express from 'express';
import {
  addreview,
  deletereview,
  editreview,
  getall,
} from '../controller/reviewcontrollers.js';

const router = express.Router();
router.get('/all/:id', getall); //fooditem id
router.post('/create/:id', addreview); //fooditem id
router.patch('/update/:id', editreview); //rating id
router.delete('/delete/:id', deletereview); //rating id
export default router;
