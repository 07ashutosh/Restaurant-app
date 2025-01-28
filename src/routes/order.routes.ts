import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";
import {} from "../controller/menu.controller";
import { 
    createCheckoutSesson, 
    getOrders, 
    stripeWebhook 
} from "../controller/order.controller";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSesson);
router.route("/webhook").post(express.raw({type: 'application/json'}), stripeWebhook);


export default router;