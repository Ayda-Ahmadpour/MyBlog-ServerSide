import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fmyblog2016%2F&psig=AOvVaw3r5eHjzmrGwfdAVMr6PuNY&ust=1708923930469000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCEivLbxYQDFQAAAAAdAAAAABAE",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
