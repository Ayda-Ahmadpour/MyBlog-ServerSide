import express from "express";
import {
  createPost,
  showPost,
  deletePost,
  updatePost,
} from "../controllers/controller-post.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/show", showPost);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);

export default router;
