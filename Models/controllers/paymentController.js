// import {instance} from '../Server.js';

// export const checkout = async  (req,res) =>{
//     const options = {
//         amount:50000,  // amount in the smallest currency unit
//         currency: "INR",
       
//     };
//   const order = await  instance.orders.create(options);
//   console.log(order);
//     res.status(200).json({
//         success:true,
   
//     });
// };

import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config({ path: "./config/config.env" });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const checkout = async (req, res) => {
  try {
    const options = { amount: 50000, currency: "INR" };
    const order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyPayment = (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  console.log("VERIFY BODY:", req.body); // 🔴 IMPORTANT

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing Razorpay payment details",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log("EXPECTED:", expectedSignature);
  console.log("RECEIVED:", razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

