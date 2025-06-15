const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/Auth");
const { getProfile, updateProfile } = require("../controllers/profilecontroller");

// All profile routes are protected
router.use(userAuth);

// @route   GET /api/profile
router.get("/", getProfile);

// @route   PATCH /api/profile
router.patch("/", updateProfile);

module.exports = router;