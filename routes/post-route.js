import express from "express";
const router = express.Router();
import { verifyUser } from "../utility/verifyUser";

router.post("/create", verifyUser, create);

export default router;
