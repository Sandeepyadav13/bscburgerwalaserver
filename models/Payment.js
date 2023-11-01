import mongoose from "mongoose" 
 
const schema = new mongoose.Schema({
 razorpay_order_id:{
    type:String,
    default:true,
 },
 razorpay_payment_id:{
    type:String,
    default:true,
 },
 razorpay_signature:{
    type:String,
    default:true,
 },
 createAt:{
     type:Date,
     default:Date.now,
 },
});
export const Payment = mongoose.model("Payment",schema);