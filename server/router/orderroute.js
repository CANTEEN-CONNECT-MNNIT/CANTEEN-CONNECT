import express from 'express';
import {
  createorder,
  getall,
  updateorder,
} from '../controller/ordercontroller.js';
import { restrict_to } from '../controller/authcontroller.js';
const router = express.Router();
router.get('/all', getall);
router.post('/create', createorder);
router.patch('/update', restrict_to('Canteen'), updateorder);
export default router;
