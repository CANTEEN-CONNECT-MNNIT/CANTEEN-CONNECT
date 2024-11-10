import express from 'express';
import { addcanteen } from '../controller/canteencontroller.js';
const router = express.Router();

router.post('/create', addcanteen);

export default router;
