import dotenv from 'dotenv'
import express from "express";
import authRoute from "./routes/auth.js";
import subsRoute from "./routes/payment.js";
import connectDB from "./connections/db.js";
import cors from "cors"

dotenv.config()

const app = express();

connectDB(app);

app.use(express.json());
app.use(cors())

app.use("/auth", authRoute);

app.use("/payment", subsRoute)
