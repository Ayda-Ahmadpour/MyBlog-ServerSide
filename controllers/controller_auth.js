import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(res.status(400).json({ error: "All fields are required" }));
  }
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return next(res.status(400).json({ error: "Invalid email" }));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(res.status(400).json({ error: "Invalid password" }));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const { password: userPassword, ...others } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
      })
      .json(others);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    next(error);
  }
};
export const google = async (req, res, next) => {
  const { name, email, googlePhoto } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      const { password, ...others } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
        })
        .json(others);
    }

    if (!user) {
      const newUser = new User({ username, email });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      const { password, ...others } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
        })
        .json(others);
    }
  } catch (error) {
    next(error);
  }
};
