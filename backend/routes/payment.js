import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import * as stripeController from "../controllers/stripeController.js";

const router = express.Router();

router.get("/products", checkAuth, stripeController.getProducts);

router.post("/session", checkAuth, stripeController.createSession);

export default router;
