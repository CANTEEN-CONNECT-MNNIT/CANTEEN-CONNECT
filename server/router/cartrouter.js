import express from 'express';
import {
  addincart,
  getcart,
  deleteincart,
  createorder,
} from '../controller/usercontroller.js';
const router = express.Router();

router.patch('/update/:id', addincart);
router.get('/get', getcart);
router.delete('/delete/:id', deleteincart);
router.get('/order', createorder);

export default router;
