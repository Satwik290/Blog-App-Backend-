const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minLength: 1,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: (value) => validator.isStrongPassword(value, { minSymbols: 0 }),
        message: 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.',
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    photoUrl: {
      type: String,
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
      validate: [validator.isURL, 'Please provide a valid photo URL'],
    },
    about: {
      type: String,
      default: 'No bio provided',
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password for login
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
};

module.exports = mongoose.model('User', userSchema);