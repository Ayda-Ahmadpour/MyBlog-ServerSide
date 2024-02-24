import express from "express";
import { test } from "../controllers/controller-user.js";
import { updateUserInformation } from "../controllers/controller-user.js";
import { verifyUser } from "../utility/verifyUser.js";
const userRouter = express.Router();
userRouter.get("/test", test);
userRouter.put("/update/:userID", verifyUser, updateUserInformation);

export default userRouter;
