import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/profile", checkAuth, authController.profile);

// router.get("/logout", checkAuth, authController.logout);

export default router;
