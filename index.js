import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-route.js";
import authRouter from "./routes/auth-route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // if connection is successful
    console.log("Connected to MongoDB !!!!");
  })
  .catch((err) => {
    // if connection is failed
    console.log("Error: ", err);
  });
app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!!");
});
