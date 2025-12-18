import express from 'express';
import { checkout, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();
router.post("/checkout", checkout);
router.post("/payment/verify", verifyPayment);


export default router;