import express from "express";
import multer from "multer";
import path from "path";
import {
  createPost,
  showPost,
  deletePost,
  updatePost,
} from "../controllers/controller-post.js";

const router = express.Router();
const UPLOAD_PATH = "../client/public/uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), createPost);
router.get("/show", showPost);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);

export default router;
