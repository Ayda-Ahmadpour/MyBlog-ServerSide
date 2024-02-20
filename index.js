import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGOOS)
  .then(() => {
    // if connection is successful
    console.log("Connected to MongoDB !!!!");
  })
  .catch((err) => {
    // if connection is failed
    console.log("Error: ", err);
  });
const app = express();

app.use("/api/user", userRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!!");
});
