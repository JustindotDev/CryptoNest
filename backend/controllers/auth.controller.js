import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../util/jwt.js";
import validator from "validator";

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields. Please complete the form.",
      });
    }

    // Note: Email domain validation (e.g., checking for real/existing domains) is not implemented.
    // Skipped for now since this is a small personal project.
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields. Please complete the form.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "The email address you entered is not associated with an account.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "The password you entered is incorrect. Please try again.",
      });
    }

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in the Login Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Succesfuly" });
  } catch (error) {
    console.log("Server Error", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// TODO: put a profile Feature

export const CheckAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
