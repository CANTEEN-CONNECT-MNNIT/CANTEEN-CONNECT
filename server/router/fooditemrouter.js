import express from 'express';
import {
  additem,
  updateitem,
  getall,
  getitem,
  deleteitem,
} from '../controller/fooditemcontroller.js';

const router = express.Router();

router.post('/create/:c_id', additem);
router.patch('/update/:id', updateitem);
router.get('/getall', getall);
router.get('/get/:id', getitem);
router.delete('/delete/:id', deleteitem);

export default router;
