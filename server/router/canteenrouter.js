import express from 'express';
import {
  addcanteen,
  updatecanteen,
  getall,
  getcanteen,
  deletecanteen,
} from '../controller/canteencontroller.js';
const router = express.Router();

router.post('/create', addcanteen);
router.patch('/update/:id', updatecanteen);
router.get('/getall', getall);
router.get('/get/:id', getcanteen);
router.delete('/delete/:id', deletecanteen);
export default router;
