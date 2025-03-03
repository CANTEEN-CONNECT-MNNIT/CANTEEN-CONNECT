import express from 'express';
import {
  addcanteen,
  updatecanteen,
  getall,
  getcanteen,
  deletecanteen,
} from '../controller/canteencontroller.js';
import { upload } from '../controller/filecontrollers.js';
const router = express.Router();

router.get('/getall', getall);
router.get('/get/:id', getcanteen);
router.delete('/delete/:id', deletecanteen);
router.post('/create', upload.single('image'), addcanteen);
router.patch('/update/:id', upload.single('image'), updatecanteen);
export default router;
