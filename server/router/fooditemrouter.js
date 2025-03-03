import express from 'express';
import {
  additem,
  updateitem,
  getall,
  getitem,
  deleteitem,
} from '../controller/fooditemcontroller.js';
import { upload } from '../controller/filecontrollers.js';

const router = express.Router();

router.post('/create/:c_id', upload.single('image'), additem);
router.patch('/update/:id', updateitem);
router.get('/getall', getall);
router.get('/get/:id', getitem);
router.delete('/delete/:id', deleteitem);

export default router;
