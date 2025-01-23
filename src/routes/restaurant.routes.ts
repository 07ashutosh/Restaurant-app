import express from "express"
import {
    createRestaurant,
    getRestaurant,
    getRestaurantOrder,
    getSingleRestaurant,
    searchRestaurant,
    updateOrderStatus,
    updateRestaurant
} from "../controller/restaurant.controller";
import upload from "../middleware/multer";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

router.route("/creatRestaurant").post(isAuthenticated, upload.single("imageFile"), createRestaurant);
router.route("/getRestaurant").get(isAuthenticated, getRestaurant);
router.route("/updateRestaurant").put(isAuthenticated, upload.single("imageFile"), updateRestaurant);
router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;