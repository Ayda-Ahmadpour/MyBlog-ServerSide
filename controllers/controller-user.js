import bcryptjs from "bcryptjs";
import User from "../models/user-model.js";
export const test = (req, res) => {
  res.json("API is running...");
};
export const updateUserInformation = async (req, res, next) => {
  console.log("req.user:", req.user);
  console.log("req.user.id:", req.user.id);
  console.log("req.params.userID:", req.params.userID);

  if (req.user.id !== req.params.userID) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        res
          .status(400)
          .json({ error: "Password must be at least 6 characters" })
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userID,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
