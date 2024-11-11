import express from 'express';
import { getall } from '../controller/ordercontroller.js';
const router = express.Router();

router.get('/all', getall);

export default router;
