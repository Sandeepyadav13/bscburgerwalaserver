import  express  from "express";
import { authorizeAdmin, isauthenticated } from "../middlewares/auth.js";
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVarification, placeOrder, placeOrderOnline, processOrder } from "../controllers/order.js";
 
const router =express.Router();

router.post("/createorder",isauthenticated,placeOrder);
router.post("/createorderonline",isauthenticated,placeOrderOnline)
router.post("/paymentverification",isauthenticated,paymentVarification)

router.get("/myorder",isauthenticated,getMyOrders);
router.get("/order/:id",isauthenticated,getOrderDetails);

//add admin middleware
router.get("/admin/orders",isauthenticated,authorizeAdmin,getAdminOrders);
router.get("/admin/order/:id",isauthenticated,processOrder);

export default router;   