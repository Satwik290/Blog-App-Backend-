const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes and authenticate users
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. Token is missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token. User not found." });
    }

    req.user = user; // Attach user object to the request
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized. Invalid token." });
  }
};

module.exports = { userAuth };