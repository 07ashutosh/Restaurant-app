import express from "express";
import upload from "../middleware/multer";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware";
import { 
    addMenu, 
    editMenu 
} from "../controller/menu.controller";


const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("imageFile"), editMenu);

export default router;

