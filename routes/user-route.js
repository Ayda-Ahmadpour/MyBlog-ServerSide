import express from "express";
import {
  test,
  signout,
  updateUserInformation,
} from "../controllers/controller-user.js";
import { verifyUser } from "../utility/verifyUser.js";
const userRouter = express.Router();
userRouter.get("/test", test);
userRouter.put("/update/:userID", verifyUser, updateUserInformation);
userRouter.post("/signout", signout);

export default userRouter;
