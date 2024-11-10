import express from 'express';
import {
  additem,
  updateitem,
  getall,
  getitem,
  deleteitem,
} from '../controller/itemcontroller.js';

const router = express.Router();

router.post('/create', additem);
router.patch('/update', updateitem);
router.get('getall', getall);
router.get('/get/:id', getitem);
router.delete('/delete/:id', deleteitem);

export default router;
