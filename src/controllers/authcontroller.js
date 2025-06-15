const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData } = require("../utils/validation");

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password, // Password will be hashed by the pre-save hook in the model
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully!" });
  } catch (err) {
    next(err);
  }
};

// Login an existing user
const loginUser = async (req, res, next) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = user.generateJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (err) {
    next(err);
  }
};

// Logout a user
const logoutUser = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000), // Expire in 5 seconds
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logout successful!" });
};

module.exports = { registerUser, loginUser, logoutUser };