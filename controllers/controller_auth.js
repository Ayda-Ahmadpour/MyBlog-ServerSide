import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
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
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    next(error);
  }
};
