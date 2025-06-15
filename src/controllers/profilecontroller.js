const { validateEditProfileData } = require("../utils/validation");

// View current user's profile
const getProfile = async (req, res, next) => {
  try {
    // req.user is populated by the userAuth middleware and has the password excluded
    res.status(200).json({ success: true, data: req.user });
  } catch (err) {
    next(err);
  }
};

// Edit current user's profile
const updateProfile = async (req, res, next) => {
  try {
    validateEditProfileData(req);

    const user = req.user;
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: `${updatedUser.firstName}, your profile was updated successfully.`,
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };