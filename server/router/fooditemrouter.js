import express from 'express';
import {
  additem,
  updateitem,
  getall,
  getitem,
  deleteitem,
} from '../controller/fooditemcontroller.js';
import { upload } from '../controller/filecontrollers.js';
import { restrict_to } from '../controller/authcontroller.js';

const router = express.Router();

router.post(
  '/create/:c_id',
  restrict_to('Canteen'),
  upload.single('image'),
  additem
);
router.patch(
  '/update/:id',
  restrict_to('Canteen'),
  upload.single('image'),
  updateitem
);
router.get('/getall', getall);
router.get('/get/:id', getitem);
router.delete('/delete/:id', restrict_to('Canteen'), deleteitem);

export default router;
