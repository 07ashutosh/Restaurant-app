import express, { Router } from "express"
import { 
    checkAuth,
    forgotPassword, 
    loginUser, 
    logout, 
    regesterUser, 
    resetPassword, 
    updateProfile, 
    verifyEmail 
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";

const router = express.Router();

router.route("/check-auth").post(isAuthenticated, checkAuth);
router.route("/signup").post(regesterUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/profile-update").put(isAuthenticated, updateProfile);


export default router;