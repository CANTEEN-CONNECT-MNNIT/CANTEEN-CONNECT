import express from 'express';
import {
  addincart,
  getcart,
  deleteincart,
} from '../controller/cartcontroller.js';
const router = express.Router();

router.patch('/update/:id', addincart);
router.get('/get', getcart);
router.delete('/delete/:id', deleteincart);

export default router;
