import express from 'express';
import {
  addreview,
  deletereview,
  editreview,
  fooditemrating,
  getall,
} from '../controller/reviewcontrollers.js';

const router = express.Router();
router.get('/all/:id', getall); //canteen id
router.post('/create/:id', addreview); //canteen id
router.patch('/update/:id', editreview); //rating id
router.delete('/delete/:id', deletereview); //rating id
router.post('/fooditem_rating', fooditemrating); //array of object of _id and rating
export default router;
