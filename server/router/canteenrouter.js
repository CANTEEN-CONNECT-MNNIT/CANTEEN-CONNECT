import express from 'express';
import {
  addcanteen,
  updatecanteen,
  getall,
  getcanteen,
  deletecanteen,
} from '../controller/canteencontroller.js';
import { upload } from '../controller/filecontrollers.js';
import { restrict_to } from '../controller/authcontroller.js';
const router = express.Router();

router.get('/getall', getall);
router.get('/get/:id', getcanteen);
router.delete('/delete/:id', restrict_to('Canteen'), deletecanteen);
router.post('/create', upload.single('image'), addcanteen);
router.patch(
  '/update/:id',
  restrict_to('Canteen'),
  upload.single('image'),
  updatecanteen
);
export default router;
