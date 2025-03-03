import express from 'express';
import { generatetoken, processpayment } from './paymentcontroller.js';
const router = express.Router();

router.get('/generate/token', generatetoken);
router.post('/process/payment', processpayment);
export default router;
