import Post from "../models/post-model.js";
import path from "path";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? path.join("/uploads/", req.file.filename) : "";

    const newPost = new Post({
      title,
      content,
      imageUrl,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to fetch all posts
export const showPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a post by ID
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
