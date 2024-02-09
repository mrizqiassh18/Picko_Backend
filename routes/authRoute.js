import express from "express";
import { register } from "../controllers/registerController.js";
import login  from "../controllers/loginController.js";
import { getUserLog } from "../controllers/loginController.js";
import upload from "../middleware/cloudinaryMiddleware.js";

const router = express.Router();

router.post('/register', upload.single('profile_photo'), register);
router.post('/login', login);
router.get('/user/:userId', getUserLog);

export default router;